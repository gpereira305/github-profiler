import { createLazyFileRoute } from "@tanstack/react-router";
import { ReposListTypes } from "../types";
import useFetchUserData from "../hooks/useFetchUserData";
import useShowAllContent from "../hooks/useShowAllContent";
import ShowAllButton from "../components/shared/ShowAllButton";
import RepoList from "../components/shared/RepoList";

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
      <RepoList
        data={userRepos}
        isLoading={isUserReposLoading}
        isError={userReposError}
        isRepos={true}
      />

      {/* {displayedRepos?.length > itemsToDisplay && (
        <ShowAllButton
          userRepos={userRepos}
          showAll={showAll}
          setShowAll={setShowAll}
          itemsToDisplay={itemsToDisplay}
        />
      )} */}
    </>
  );
}
