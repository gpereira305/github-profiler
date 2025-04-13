import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useMemo } from "react";
import { useQueryStore } from "../states/query-store";
import { useCurrentQueryStore } from "../states/current-query-store";
import axios from "axios";

export default function useFetchUserData() {
  const api = "https://api.github.com/users";
  const defaultUser = "gabrielcordeiro-dev";
  const { searchQuery, setSearchQuery } = useQueryStore();
  const { currentQuery, setCurrentQuery } = useCurrentQueryStore();

  // paramnetros para as queries
  const queryOptions = useMemo(
    () => ({
      enabled: Boolean(currentQuery),
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000,
      staleTime: 2 * 60 * 1000,
    }),
    [currentQuery]
  );

  // dados de perfil do usuário
  const userProfileQuery = useQuery({
    ...queryOptions,
    queryKey: ["githubUser", currentQuery],
    enabled: Boolean(currentQuery),
    queryFn: async () => {
      const response = await axios.get(`${api}/${currentQuery}`);
      return response.data;
    },
  });

  // dados de repositórios do usuário
  const userReposQuery = useQuery({
    ...queryOptions,
    queryKey: ["githubUserRepos", currentQuery],
    enabled: Boolean(currentQuery),
    queryFn: async () => {
      const response = await axios.get(`${api}/${currentQuery}/repos`);
      return response.data;
    },
  });

  // dados de repositórios starred do usuário
  const starredReposQuery = useQuery({
    ...queryOptions,
    queryKey: ["starredRepos", currentQuery],
    enabled: Boolean(currentQuery),
    queryFn: async () => {
      const response = await axios.get(`${api}/${currentQuery}/starred`);
      return response.data;
    },
  });

  // função para detectar o click do botão Enter
  const handleKeyDown = useCallback(
    (e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setCurrentQuery(searchQuery);
      }
    },
    [searchQuery]
  );

  // função para limpar o campo de busca
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentQuery(defaultUser);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value);
      if (e.target.value === "") {
        handleClearSearch();
      }
    },
    [handleClearSearch]
  );

  return {
    userProfileQuery,
    userReposQuery,
    starredReposQuery,
    handleKeyDown,
    handleClearSearch,
    handleChange,
  };
}
