import { createLazyFileRoute } from "@tanstack/react-router";
import RepoList from "../components/shared/RepoList";
import { ReposListTypes } from "../types";

const data = [
  {
    name: "Node",
    highlight: "Release",
    desc: "Node.js Foundation Release Working Group.",
    stars: 1.569,
    forks: 142,
  },
  {
    name: "Cordeiro",
    highlight: "Angular Choosen",
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque scelerisque ut risus.`,
    stars: 726,
    forks: 91,
  },
  {
    name: "Teste",
    highlight: "App Release 1.03",
    desc: `
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque scelerisque ut risus.
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque  
    `,
    stars: 9.327,
    forks: 562,
  },
];

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <RepoList data={data as ReposListTypes[]} />;
}
