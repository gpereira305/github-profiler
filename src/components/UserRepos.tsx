import Filters from "./Filters";
import NavigationBar from "./shared/NavigationBar";
import { Outlet } from "@tanstack/react-router";

export default function UserRepos() {
  return (
    <section className="flex-2 border-fuchsia-500 border-[1px]">
      <NavigationBar />
      <Filters />
      <Outlet />
    </section>
  );
}
