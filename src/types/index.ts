export interface ReposListTypes {
  id?: number;
  forks?: number | null | undefined;
  language?: string | null | undefined;
  stargazers_count?: number | null | undefined;
  isRepos?: boolean | undefined;
  html_url?: string | null;
  description?: string | null;
  owner?: { login: string };
  login?: string;
  name?: string;
  data?: ReposListTypes[] | undefined;
  isLoading?: boolean | null;
  isPending?: boolean | null;
  isError?: boolean | null | undefined;
  fork?: boolean | undefined;
}

export type GithubUser = {
  name: string;
  company: string;
  avatar_url: string;
  location: string;
  bio: string;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
};

export type GetUserFilter = {
  username: string;
};
