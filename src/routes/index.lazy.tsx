import { createLazyFileRoute } from "@tanstack/react-router";
import { ReposListTypes } from "../types";
import useFetchUserData from "../hooks/useFetchUserData";
import { ForkIcon, StarFilledIcon } from "../components/Icons";
import useShowAllContent from "../hooks/useShowAllContent";
import Button from "../components/shared/Button";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { userReposQuery } = useFetchUserData();

  const {
    data: userRepos,
    error: userReposError,
    isLoading: isUserReposLoading,
  } = userReposQuery;

  const { displayedRepos, showAll, setShowAll, itemsToDisplay } =
    useShowAllContent({
      data: userRepos,
    } as ReposListTypes);

  if (isUserReposLoading) {
    return <div>Carregando...</div>;
  }

  if (userReposError) {
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
                <StarFilledIcon fill="#000" /> {repo.stargazers_count}
              </span>

              <span className="text-sm text-dark font-normal flex items-center gap-2">
                <ForkIcon />
                {repo.forks}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {!showAll && userRepos && userRepos.length > itemsToDisplay && (
        <Button onClick={() => setShowAll(true)} />
      )}
    </>
  );
}
