import { createLazyFileRoute } from "@tanstack/react-router";
import { ReposListTypes } from "../types";
import { ForkIcon } from "../components/Icons";
import useFetchUserData from "../hooks/useFetchUserData";
import useShowAllContent from "../hooks/useShowAllContent";
import Button from "../components/shared/Button";

export const Route = createLazyFileRoute("/starred")({
  component: RouteComponent,
});

function RouteComponent() {
  const { starredReposQuery } = useFetchUserData();
  useFetchUserData();

  const {
    data: starredRepos,
    error: starredReposError,
    isFetching: isStarredReposLoading,
  } = starredReposQuery;

  const { displayedRepos, showAll, setShowAll, itemsToDisplay } =
    useShowAllContent({
      data: starredRepos,
    } as ReposListTypes);

  if (isStarredReposLoading) {
    return <div>Carregando...</div>;
  }

  if (starredReposError) {
    return <div>Erro ao carregar repositórios.</div>;
  }

  return (
    <>
      <ul className="flex flex-col gap-10 p-2">
        {displayedRepos?.map((repo: ReposListTypes) => (
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
                {repo.language || "-- --"}
              </span>

              <span className="text-sm text-dark font-normal flex items-center gap-2">
                <ForkIcon />
                {repo.forks}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {!showAll && starredRepos && starredRepos.length > itemsToDisplay && (
        <Button onClick={() => setShowAll(true)} />
      )}
    </>
  );
}
