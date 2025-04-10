import NavigationBar from "../components/shared/NavigationBar";
import { Outlet } from "@tanstack/react-router";

export default function RepoContentLayout() {
  return (
    <section className="flex-2">
      <NavigationBar />

      <Outlet />
    </section>
  );
}
