import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import UserProfile from "./components/UserProfile";
import RepoContentLayout from "./layouts/RepoContentLayout";
export default function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <UserProfile />
        <RepoContentLayout />
      </MainLayout>
    </>
  );
}
