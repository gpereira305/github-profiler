import Image from "./shared/Image";
import {
  BuildingIcon,
  ChainIcon,
  InstagramIcon,
  LocationPinIcon,
} from "./Icons";
import useFetchUserData from "../hooks/useFetchUserData";

export default function UserProfile() {
  const { userProfileQuery } = useFetchUserData();
  const {
    data: userProfile,
    error: userProfileError,
    isLoading: isUserProfileLoading,
  } = userProfileQuery;

  if (isUserProfileLoading) {
    return <div>Carregando...</div>;
  }

  if (userProfileError) {
    return <div>Erro ao carregar perfil do usuário.</div>;
  }

  const { name, company, avatar_url, location, bio, socialMedia, instagram } =
    userProfile;

  return (
    <aside className="flex-1 py-2 px-8 flex max-w-[380px] flex-col lg:mx-0 mx-auto">
      <figure className="flex items-center bg-primary flex-col gap-4 pb-8">
        <Image
          src={avatar_url}
          title={name}
          alt={name}
          className="object-cover w-[150px] h-[150px] rounded-full"
        />
        <figcaption className="text-sm text-dark-light text-center flex-col flex">
          <span className="text-dark text-2xl font-bold">{name}</span>
          <span className="text-base text-dark-light font-normal">{bio}</span>
        </figcaption>
      </figure>
      <ul className="px-8 flex flex-col gap-2">
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <BuildingIcon /> {company}
        </li>
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <LocationPinIcon /> {location}
        </li>
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <ChainIcon />
          <a
            href={socialMedia || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMedia || "Não informado"}
          </a>
        </li>
        <li className="flex items-center gap-4 text-sm text-secondary font-normal">
          <InstagramIcon />
          <a
            href={`https://www.instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {instagram || "Não informado"}
          </a>
        </li>
      </ul>
    </aside>
  );
}
