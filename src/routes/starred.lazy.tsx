import { createLazyFileRoute } from "@tanstack/react-router";
import { ReposListTypes } from "../types";
import { ForkIcon } from "../components/Icons";
import useFetchUserData from "../hooks/useFetchUserData";
import useShowAllContent from "../hooks/useShowAllContent";
import ShowAllButton from "../components/shared/ShowAllButton";
import RepoList from "../components/shared/RepoList";

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
      <RepoList
        data={starredRepos}
        isLoading={isStarredReposLoading}
        isError={starredReposError}
        isRepos={false}
      />

      {/* {displayedRepos.length > itemsToDisplay && (
        <ShowAllButton
          userRepos={starredRepos}
          showAll={showAll}
          setShowAll={setShowAll}
          itemsToDisplay={itemsToDisplay}
        />
      )} */}
    </>
  );
}
