import { useCallback, useMemo, useState } from "react";
import { ReposListTypes } from "../../types";
import { ChevronIcon, CloseIcon, ForkIcon, StarFilledIcon } from "../Icons";
import "react-modern-drawer/dist/index.css";
import { useToggleTypeStore } from "../../states/toggle-type-store";
import ContentDrawer from "./ContentDrawer";
import { useDrawerStore } from "../../states/drawer-store";
import FilterItemList from "./FilterItemList";
import ReposListSkeleton from "../loadingSkeletons/ReposListSkeleton";
import { Link } from "@tanstack/react-router";

export default function RepoList({
  data,
  isLoading,
  isError,
  isRepos,
}: ReposListTypes) {
  const { toggleDrawer } = useDrawerStore();
  const { toggleType } = useToggleTypeStore();

  const [filters, setFilters] = useState({ language: "", type: "All Types" });
  const [showAll, setShowAll] = useState(false);
  const DATA_LENGTH = 5;

  // funções detectar valores para a filtragem
  const handleFiltersChange = useCallback(
    (filterType: keyof typeof filters, value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    []
  );

  // parâmetros a serem filtrados nos dados
  const filteredRepos = useMemo(() => {
    return data?.filter((repo: ReposListTypes) => {
      const languageMatch =
        !filters.language || repo.language === filters.language;
      const typeMatch =
        !filters.type ||
        (filters.type === "Forks"
          ? repo.fork
          : filters.type === "Sources"
            ? !repo.fork
            : filters.type === "All Types"
              ? true
              : false);
      return languageMatch && typeMatch;
    });
  }, [data, filters]);

  const filterOptionTypes = useMemo(() => {
    return ["All Types", "Sources", "Forks", "Archived", "Mirrors"];
  }, []);

  const filterOptionLanguages = useMemo(() => {
    return ["All Languages", "Java", "TypeScript", "HTML", "CSS"];
  }, []);

  // apenas os 5 dados da lista seram mostrados
  const displayedRepos = showAll
    ? filteredRepos
    : filteredRepos?.slice(0, DATA_LENGTH);

  // status de carregamento
  if (isLoading) return <ReposListSkeleton />;

  // status de erro
  if (isError)
    return (
      <div className="bg-gray sm:min-h-[60vh] min-h-[30vh] flex rounded-md items-center justify-center">
        <h2 className="text-lg text-red-500 font-bold text-center">
          Erro ao carregar dados :(
        </h2>
      </div>
    );

  const handleGetRepoDetails = (repoName: string, repoOwner: string) => {
    sessionStorage.setItem(
      "repo-details",
      JSON.stringify({
        name: repoName,
        owner: repoOwner,
      })
    );
  };

  return (
    <>
      {/* lista de repositórios e starreds */}
      {filteredRepos !== undefined && filteredRepos?.length > 0 ? (
        <>
          <ul className="flex flex-col gap-10 p-2 mb-10">
            {displayedRepos?.map((repo: ReposListTypes) => {
              const {
                id,
                forks,
                language,
                stargazers_count,
                description,
                owner,
                name,
              } = repo;

              return (
                <li key={id}>
                  <article className="flex items-center gap-2">
                    <h2 className="text-lg text-dark font-light">
                      {owner?.login} /{" "}
                    </h2>
                    {name && (
                      <Link
                        to={`/details`}
                        className="text-secondary font-bold hover:underline cursor-pointer"
                        onClick={() =>
                          handleGetRepoDetails(name, owner?.login ?? "")
                        }
                      >
                        {name}
                      </Link>
                    )}
                  </article>
                  {description && (
                    <p className="text-sm text-dark-light">{description}</p>
                  )}
                  <div className="flex items-center gap-2 justify-between w-full max-w-[150px] pt-3">
                    <span className="text-sm text-dark font-normal flex items-center gap-2">
                      {isRepos ? (
                        <>
                          <StarFilledIcon fill="#000" /> {stargazers_count}
                        </>
                      ) : language ? (
                        language
                      ) : (
                        "--"
                      )}
                    </span>
                    <span className="text-sm text-dark font-normal flex items-center gap-2">
                      <ForkIcon />
                      {forks}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          {!showAll && filteredRepos.length > DATA_LENGTH && (
            <button
              className="text-secondary font-semibold flex items-center flex-col cursor-pointer text-sm mx-auto"
              onClick={() => setShowAll(true)}
            >
              Ver tudo <ChevronIcon fill="var(--color-secondary)" />
            </button>
          )}
        </>
      ) : (
        <div className="bg-gray sm:min-h-[60vh] min-h-[30vh] flex rounded-md items-center justify-center">
          <h2 className="text-lg text-dark  font-bold text-center">
            Nenhum conteúdo encontrado :(
          </h2>
        </div>
      )}

      {/* drawer com filtros */}
      <ContentDrawer>
        <div className="flex gap-2 flex-col pt-4">
          <div className="flex gap-2 justify-between items-center pb-10">
            <h2 className="text-2xl text-dark font-bold ">
              {toggleType ? "Types" : "Languages"}
            </h2>
            <CloseIcon
              onClick={() => toggleDrawer()}
              className="cursor-pointer"
            />
          </div>

          <FilterItemList
            filterOptionTypes={filterOptionTypes}
            filterOptionLanguages={filterOptionLanguages}
            filters={filters}
            handleFiltersChange={handleFiltersChange}
          />
        </div>
      </ContentDrawer>
    </>
  );
}
