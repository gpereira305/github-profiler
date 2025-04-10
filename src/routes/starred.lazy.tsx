import { createLazyFileRoute } from "@tanstack/react-router";
import RepoList from "../components/shared/RepoList";
import { ReposListTypes } from "../types";

const data = [
  {
    name: "Chamber 5.62",
    highlight: "Smite and Ignite",
    desc: "Node.js Foundation Release Working Group.",
    language: "C++",
    forks: 525,
  },
  {
    name: "BNB",
    highlight: "Vandal",
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis 
    vel etiam tellus velit pellentesque scelerisque ut risus.`,
    language: "Python",
    forks: null,
  },
  {
    name: "llikatsni",
    highlight: "Operator",
    desc: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque scelerisque ut 
    risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque 
    `,
    language: "JavaScript",
    forks: 312,
  },
];

export const Route = createLazyFileRoute("/starred")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RepoList data={data as ReposListTypes[]} />;
}
