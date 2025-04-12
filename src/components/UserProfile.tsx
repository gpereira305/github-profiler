import Image from "./shared/Image";
import useFetchUserData from "../hooks/useFetchUserData";
import {
  BuildingIcon,
  ChainIcon,
  InstagramIcon,
  LocationPinIcon,
} from "./Icons";
import UserProfileSkeleton from "./shared/UserProfileSkeleton";

export default function UserProfile() {
  const { userProfileQuery } = useFetchUserData();
  const {
    data: userProfile,
    error: userProfileError,
    isLoading: isUserProfileLoading,
  } = userProfileQuery;

  const asideStyle = `flex-1 py-2 px-4 sm:px-8 flex max-w-[380px] flex-col lg:mx-0 mx-auto sm:w-ft w-full`;
  console.log(isUserProfileLoading);
  //display de carregamento
  if (isUserProfileLoading) {
    return (
      <aside className={asideStyle}>
        <UserProfileSkeleton />
      </aside>
    );
  }
  // diplay de erro
  if (userProfileError) {
    return (
      <aside
        className={`${asideStyle} bg-gray max-h-[70vh] rounded-md items-center justify-center`}
      >
        <h2 className="text-lg text-red-500 font-bold text-center">
          Erro ao carregar perfil do usuário :(
        </h2>
      </aside>
    );
  }

  const { name, company, avatar_url, location, bio, socialMedia, instagram } =
    userProfile;

  return (
    <aside className={asideStyle}>
      <figure className="flex items-center bg-primary flex-col gap-4 pb-4 w-[150px] h-auto rounded-full max-h-[200px] mx-auto relative">
        <Image
          src={avatar_url}
          title={name}
          alt={name}
          className="object-cover w-[inherit] h-[inherit] rounded-[inherit]"
        />
      </figure>
      <div className="text-sm text-dark-light text-center flex-col flex">
        <span className="text-dark text-2xl font-bold">{name}</span>
        <span className="text-base text-dark-light font-normal">
          {bio || "----"}
        </span>
      </div>

      <ul className="px-8 flex flex-col gap-2">
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <BuildingIcon /> {company || "----"}
        </li>
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <LocationPinIcon /> {location || "----"}
        </li>
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <ChainIcon />
          <a
            href={socialMedia || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMedia || "----"}
          </a>
        </li>
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <InstagramIcon />
          <a
            href={`https://www.instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {instagram || "----"}
          </a>
        </li>
      </ul>
    </aside>
  );
}
