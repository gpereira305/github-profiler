import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/starred")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/about"!</div>;
}
