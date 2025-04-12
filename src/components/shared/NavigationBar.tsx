import { Link } from "@tanstack/react-router";
import { BookIcon, StarOulinedIcon } from "../Icons";
import useFetchUserData from "../../hooks/useFetchUserData";

export default function NavigationBar() {
  const { starredReposQuery, userProfileQuery } = useFetchUserData();
  const { data: starredRepos } = starredReposQuery;
  const { data: userRepos } = userProfileQuery;

  const linkStyle = `flex items-center text-base sm:text-lg gap-4 transition-colors duration-200 pb-2 active-link border-b-2 border-transparent px-1`;

  return (
    <nav className="flex sm:gap-x-24 gap-x-2 p-2 sm:justify-start justify-between sm:flex-row flex-col sm:gap-y-0 gap-y-6 mb-8">
      <Link to="/" className={linkStyle}>
        {({ isActive }) => (
          <>
            <BookIcon fill={isActive ? "#000" : "#989898"} />
            <span className={isActive ? "text-black" : "text-dark-light"}>
              Repositories
            </span>
            <PillElement value={userRepos?.public_repos || 0} />
          </>
        )}
      </Link>
      <Link to="/starred" className={linkStyle}>
        {({ isActive }) => (
          <>
            <StarOulinedIcon fill={isActive ? "#000" : "#989898"} />
            <span className={isActive ? "text-black" : "text-dark-light"}>
              Starred
            </span>
            <PillElement value={starredRepos?.length || 0} />
          </>
        )}
      </Link>
    </nav>
  );
}

const PillElement = ({ value }: { value: number }) => {
  return (
    <span className="flex items-center justify-center rounded-2xl bg-[#F8F8F8] border border-dark-light px-4 h-7 text-dark-light text-sm xs:ml-0 ml-auto">
      {value}
    </span>
  );
};
