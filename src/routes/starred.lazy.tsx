import { createLazyFileRoute } from "@tanstack/react-router";
import RepoList from "../components/shared/RepoList";
import useFetchGithubData from "../hooks/useFetchGithubData";

export const Route = createLazyFileRoute("/starred")({
  component: RouteComponent,
});

function RouteComponent() {
  const { starredReposQuery } = useFetchGithubData();

  const {
    data: starredRepos,
    isError: starredReposError,
    isLoading: isStarredReposLoading,
  } = starredReposQuery;

  return (
    <RepoList
      data={starredRepos}
      isLoading={isStarredReposLoading}
      isError={!!starredReposError}
      isRepos={false}
    />
  );
}
