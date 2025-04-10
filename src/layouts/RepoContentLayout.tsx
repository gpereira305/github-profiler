import NavigationBar from "../components/shared/NavigationBar";
import { Outlet } from "@tanstack/react-router";

export default function RepoContentLayout() {
  return (
    <section className="flex-2 border-red-500 border-1">
      <NavigationBar />

      <Outlet />
    </section>
  );
}
