import { createLazyFileRoute } from "@tanstack/react-router";
import RepoList from "../components/shared/RepoList";
import useFetchGithubData from "../hooks/useFetchGithubData";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { userReposQuery } = useFetchGithubData();

  const {
    data: userRepos,
    isError: userReposError,
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
