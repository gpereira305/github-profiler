import { useCallback, useMemo, useState } from "react";
import { ReposListTypes } from "../../types";
import { ForkIcon, StarFilledIcon } from "../Icons";
import "react-modern-drawer/dist/index.css";
import { useToggleTypeStore } from "../../states/toggle-type-store";
import ContentDrawer from "./ContentDrawer";

export default function RepoList({
  data,
  isLoading,
  isError,
  isRepos,
}: ReposListTypes) {
  const { toggleType } = useToggleTypeStore();
  const [filters, setFilters] = useState({ language: "", type: "All Types" });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar repositórios.</div>;

  const handleFiltersChange = useCallback(
    (filterType: keyof typeof filters, value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    []
  );

  const filteredRepos = useMemo(() => {
    return data?.filter((repo) => {
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
    return ["All Languages", "TypeScript", "JavaScript", "HTML", "CSS"];
  }, []);

  return (
    <>
      {filteredRepos?.length > 0 ? (
        <ul className="flex flex-col gap-10 p-2 mb-10">
          {filteredRepos?.map((repo: ReposListTypes) => (
            <li key={repo.id}>
              <article className="flex items-center gap-2">
                <h2 className="text-lg text-dark font-light">
                  {repo.owner.login} /{" "}
                </h2>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary font-bold hover:underline"
                >
                  {repo.name}
                </a>
              </article>
              {repo.description && (
                <p className="text-sm text-dark-light">{repo.description}</p>
              )}
              <div className="flex items-center gap-2 justify-between w-full max-w-[150px] pt-3">
                <span className="text-sm text-dark font-normal flex items-center gap-2">
                  {isRepos ? (
                    <>
                      <StarFilledIcon fill="#000" /> {repo.stargazers_count}
                    </>
                  ) : repo.language ? (
                    repo.language
                  ) : (
                    "--"
                  )}
                </span>
                <span className="text-sm text-dark font-normal flex items-center gap-2">
                  <ForkIcon />
                  {repo.forks}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 p-2 mb-10 min-h-[20vh] w-full">
          <h2 className="text-xl text-dark font-semibold text-center">
            Nenhum repositório encontrado.
          </h2>
        </div>
      )}
      <ContentDrawer>
        <div className="flex gap-2 flex-col pt-4">
          <h2 className="text-2xl text-dark font-bold pb-10">
            {toggleType ? "Types" : "Languages"}
          </h2>
          <div className="flex gap-4 flex-col">
            {toggleType
              ? filterOptionTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 text-base text-dark font-normal"
                  >
                    <input
                      type="checkbox"
                      checked={filters.type === type}
                      onChange={() => handleFiltersChange("type", type)}
                      className="h-5 w-5 text-blue-600 border-2 border-[#BFBFBF] rounded-sm focus:ring-blue-500 cupo"
                    />
                    {type}
                  </label>
                ))
              : filterOptionLanguages.map((language) => (
                  <label
                    key={language}
                    className="flex items-center gap-3 text-base text-dark font-normal"
                  >
                    <input
                      type="checkbox"
                      checked={
                        filters.language ===
                        (language === "All Languages" ? "" : language)
                      }
                      onChange={() =>
                        handleFiltersChange(
                          "language",
                          language === "All Languages" ? "" : language
                        )
                      }
                      className="h-5 w-5 text-blue-600 border-2 border-[#BFBFBF] rounded-sm focus:ring-blue-500 cupo"
                    />
                    {language}
                  </label>
                ))}
          </div>
        </div>
      </ContentDrawer>
    </>
  );
}
