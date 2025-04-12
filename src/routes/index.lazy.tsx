import { createLazyFileRoute } from "@tanstack/react-router";
import RepoList from "../components/shared/RepoList";
import useFetchUserData from "../hooks/useFetchUserData";

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

  return (
    <RepoList
      data={userRepos}
      isLoading={isUserReposLoading}
      isError={!!userReposError}
      isRepos={true}
    />
  );
}
