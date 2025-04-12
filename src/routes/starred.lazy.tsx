import { createLazyFileRoute } from "@tanstack/react-router";
import RepoList from "../components/shared/RepoList";
import useFetchUserData from "../hooks/useFetchUserData";

export const Route = createLazyFileRoute("/starred")({
  component: RouteComponent,
});

function RouteComponent() {
  const { starredReposQuery } = useFetchUserData();

  const {
    data: starredRepos,
    error: starredReposError,
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
