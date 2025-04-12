export type ReposListTypes = {
  data: ReposListTypes[];
  id: number;
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
  description: string;
  stargazers_count: number;
  desc: string;
  language?: string | null;
  forks: number | null;
  stars: number;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  ITEMS_LENGTH: number;
};

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
