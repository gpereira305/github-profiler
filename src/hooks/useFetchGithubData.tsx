import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useMemo } from "react";
import { useQueryStore } from "../states/query-store";
import { useCurrentQueryStore } from "../states/current-query-store";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

export default function useFetchGithubData() {
  const API_URL = "https://api.github.com/users";
  const { searchQuery, setSearchQuery } = useQueryStore();
  const { currentQuery, setCurrentQuery } = useCurrentQueryStore();
  const navigate = useNavigate();

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
      const response = await axios.get(`${API_URL}/${currentQuery}`);
      return response.data;
    },
  });

  // dados do repositórios do usuário
  const userReposQuery = useQuery({
    ...queryOptions,
    queryKey: ["githubUserRepos", currentQuery],
    enabled: Boolean(currentQuery),
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/${currentQuery}/repos`);
      return response.data;
    },
  });

  // dados do repositórios starred do usuário
  const starredReposQuery = useQuery({
    ...queryOptions,
    queryKey: ["starredRepos", currentQuery],
    enabled: Boolean(currentQuery),
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/${currentQuery}/starred`);
      return response.data;
    },
  });

  // função para detectar o click no botão Enter
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
    setCurrentQuery(currentQuery);
  }, []);

  // função para controle do campo de busca
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value);
      if (e.target.value === "") {
        handleClearSearch();
        setCurrentQuery(currentQuery);
        navigate({
          to: "/",
        });
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
