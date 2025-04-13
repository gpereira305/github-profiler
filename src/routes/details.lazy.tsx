import { useCallback, useEffect, useState } from "react";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DetailsSkeleton from "../components/loadingSkeletons/DetailsSkeleton";
import { ChainIcon, ChevronIcon } from "../components/Icons";

export const Route = createLazyFileRoute("/details")({
  component: RouteComponent,
});

type RepositoryDetails = {
  name: string;
  owner: string;
};

function RouteComponent() {
  const [repositoryDetails, setRepositoryDetails] =
    useState<RepositoryDetails | null>(null);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const ITEMS_LIMIT = 5;

  // função buscar os dados no sessionStorage
  useEffect(() => {
    const storedRepositoryDetails = JSON.parse(
      sessionStorage.getItem("repo-details") as string
    ) as RepositoryDetails | null;
    if (storedRepositoryDetails) {
      setRepositoryDetails(storedRepositoryDetails);
    }
  }, []);

  const fetchRepositoryDetails = useCallback(async () => {
    if (repositoryDetails?.name && repositoryDetails?.owner) {
      const response = await axios.get(
        `https://api.github.com/repos/${repositoryDetails.owner}/${repositoryDetails.name}`
      );
      return response.data;
    }
    return null;
  }, [repositoryDetails?.name, repositoryDetails?.owner]);

  const {
    data: repositoryData,
    isLoading: isRepositoryLoading,
    isError: repositoryError,
  } = useQuery({
    queryKey: ["repository", repositoryDetails?.name],
    enabled: Boolean(repositoryDetails?.name),
    queryFn: fetchRepositoryDetails,
  });

  const handleGoBack = () => {
    router.history.back();
    sessionStorage.removeItem("repo-details");
  };

  const handleToggleShowMore = () => {
    setShowMore(true);
  };

  // função para converter a data em formato de data
  const convertDate = (date: string) => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObject.toLocaleDateString("pt-BR", options);
  };

  // se estiver carregando dados, exibe um skeleton
  if (isRepositoryLoading) {
    return <DetailsSkeleton />;
  }

  // se houver erro ao carregar dados, exibe uma mensagem de erro
  if (repositoryError) {
    return (
      <div className="bg-gray sm:min-h-[60vh] min-h-[30vh] flex rounded-md items-center justify-center">
        <h2 className="text-lg text-red-500 font-bold text-center">
          Erro ao carregar dados :(
        </h2>
      </div>
    );
  }
  // se não houver dados de repositório, exibe uma mensagem de erro
  if (!repositoryDetails) {
    return (
      <div className="flex gap-4 items-center w-full flex-col justify-center min-h-[30vh]">
        <h1 className="w-full text-center text-xl text-dark font-semibold">
          Sem detalhes para exibir :(
        </h1>
        <button
          onClick={handleGoBack}
          className="text-base text-secondary font-semibold cursor-pointer"
        >
          Voltar
        </button>
      </div>
    );
  }

  const items = [
    {
      label: "Nome do projeto:",
      value: repositoryData?.name,
      link: repositoryData?.html_url,
      isLink: true,
    },
    {
      label: "Responsável:",
      value: repositoryData?.owner?.login,
      link: repositoryData?.owner?.html_url,
      isLink: true,
    },
    {
      label: "Linguagem:",
      value: repositoryData?.language,
      link: null,
      isLink: false,
    },
    {
      label: "Visualizações:",
      value: repositoryData?.watchers,
      link: null,
      isLink: false,
    },
    {
      label: "Issues em aberto:",
      value: repositoryData?.open_issues,
      link: null,
      isLink: false,
    },
    {
      label: "Data de criação:",
      value: convertDate(repositoryData?.created_at),
      link: null,
      isLink: false,
    },
    {
      label: "Favoritos:",
      value: repositoryData?.stargazers_count,
      link: null,
      isLink: false,
    },
    {
      label: "Forks:",
      value: repositoryData?.forks_count,
      link: null,
      isLink: false,
    },
    {
      label: "Hospedagem:",
      value: repositoryData?.homepage,
      link: repositoryData?.homepage,
      isLink: true,
    },
    {
      label: "Descrição:",
      value: repositoryData?.description,
      link: null,
      isLink: false,
    },
    {
      label: "Tags:",
      value: repositoryData?.topics?.slice(0, 5),
      link: null,
      isLink: false,
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.value !== null && item.value !== undefined && item.value.length > 0
  );

  const listStyles = `bg-light_color flex flex-col gap-1 p-4 rounded-md min-h-[90px] 
  shadow-sm bg-primary hover:translate-x-2 custom-transition cursor-pointer`;
  const listTitleStyles = `text-lg text-dark font-semibold`;
  const listParagraphStyles = `text-base text-dark-light font-normal`;

  return (
    <div className="bg-gray rounded-2xl px-4 py-8">
      <div className="flex gap-4 items-center w-full sm:mb-14 mb-10">
        <span
          onClick={handleGoBack}
          className="text-sm sm:text-base text-secondary font-semibold cursor-pointer flex items-center hover:underline"
        >
          <ChevronIcon
            fill="var(--color-secondary)"
            className="transform rotate-90 w-4 sm:w-8"
          />
          Voltar
        </span>
        <h1 className="w-full text-right sm:text-center text-lg sm:text-xl text-dark font-semibold">
          Detalhes do repositório
        </h1>
      </div>
      <ul className="flex flex-col gap-4">
        {filteredItems
          .slice(0, showMore ? filteredItems.length : ITEMS_LIMIT)
          .map((item, index) => (
            <li key={index} className={listStyles}>
              <h3 className={listTitleStyles}>{item.label}</h3>
              {Array.isArray(item.value) ? (
                <ul className="flex gap-x-2 flex-wrap">
                  {item.value.map((value: string) => (
                    <li key={value} className={listParagraphStyles}>
                      #{value}
                    </li>
                  ))}
                </ul>
              ) : item.isLink ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`${listParagraphStyles} hover:text-secondary hover:underline flex items-center gap-2`}
                >
                  <ChainIcon />
                  {item.value}
                </a>
              ) : (
                <p className={listParagraphStyles}>{item.value}</p>
              )}
            </li>
          ))}
      </ul>
      {filteredItems.length > ITEMS_LIMIT && !showMore && (
        <button
          className="text-secondary font-semibold flex items-center flex-col cursor-pointer text-sm mx-auto mt-5"
          onClick={handleToggleShowMore}
        >
          Mostrar tudo <ChevronIcon fill="var(--color-secondary)" />
        </button>
      )}
    </div>
  );
}
