import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import UserProfile from "./components/UserProfile";
import UserRepos from "./components/UserRepos";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <UserProfile />
        <UserRepos />
      </MainLayout>
      <Footer />
    </>
  );
}
