import Image from "./shared/Image";
import useFetchUserData from "../hooks/useFetchUserData";
import UserProfileSkeleton from "./shared/UserProfileSkeleton";
import { useEffect, useState } from "react";
import {
  BuildingIcon,
  ChainIcon,
  ChevronIcon,
  InstagramIcon,
  LocationPinIcon,
} from "./Icons";

export default function UserProfile() {
  const [showAll, setShowAll] = useState(false);

  const { userProfileQuery } = useFetchUserData();
  const {
    data: userProfile,
    error: userProfileError,
    isLoading: isUserProfileLoading,
  } = userProfileQuery;

  useEffect(() => {
    document.title = `Github Profiler | ${userProfile?.name || "Aguarde..."}`;
  }, [userProfile?.name]);

  const asideStyle = `
    flex-1 py-2 px-0 sm:px-8 flex max-w-[380px] flex-col lg:mx-0 mx-auto sm:w-ft w-full
    sm:min-h-[35vh] min-h-[30vh]
  `;

  if (isUserProfileLoading) {
    return (
      <aside className={asideStyle}>
        <UserProfileSkeleton />
      </aside>
    );
  }
  if (userProfileError) {
    return (
      <aside
        className={`
          ${asideStyle} bg-gray max-h-[70vh] rounded-md items-center justify-center
        `}
      >
        <h2 className="text-lg text-red-500 font-bold text-center">
          Erro ao carregar dados :(
        </h2>
      </aside>
    );
  }

  const { name, company, avatar_url, location, bio, socialMedia, instagram } =
    userProfile;

  return (
    <aside className={asideStyle}>
      <figure
        className="
          flex items-center bg-primary flex-col gap-4 pb-4 w-[150px] h-[150px]
          rounded-full max-h-[200px] mx-auto relative border-[1px] border-dark-light
        "
      >
        <Image
          src={avatar_url}
          title={name}
          alt={name}
          className="object-cover w-[inherit] h-[inherit] rounded-[inherit]"
        />
      </figure>
      <div className="text-sm text-dark-light text-center flex-col flex mb-6">
        <span className="text-dark text-2xl font-bold">{name}</span>
        <span className="text-base text-dark-light font-normal">
          {bio || "Descrição não informada"}
        </span>
      </div>

      <div className="">
        <span
          onClick={() => setShowAll(!showAll)}
          className="
            cursor-pointer text-secondary text-sm font-normal flex-col items-center
            sm:hidden flex
          "
        >
          Informações adicionais
          <ChevronIcon
            fill="#0587ff"
            className={`${showAll ? "rotate-180" : ""}`}
          />
        </span>
        <ul
          className={`
            overflow-x-hidden h-auto px-4 sm:px-8 flex flex-col gap-2 sm:h-auto sm:overflow-visible bg-[#F8F8F8] sm:bg-transparent rounded-2xl
            transition-all duration-200 ${showAll ? "max-h-[200px] py-4 " : "max-h-[0px]"}
          `}
        >
          <li className="flex items-center gap-4 text-sm text-secondary font-normal">
            <BuildingIcon /> {company || "Local de trabalho não informado"}
          </li>
          <li className="flex items-center gap-4 text-sm text-secondary font-normal">
            <LocationPinIcon /> {location || "Localização não informada"}
          </li>
          <li className="flex items-center gap-4 text-sm text-secondary font-normal">
            <ChainIcon />
            <a
              href={socialMedia || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialMedia || "Link do site pessoal não informado"}
            </a>
          </li>
          <li className="flex items-center gap-4 text-sm text-secondary font-normal">
            <InstagramIcon />
            <a
              href={instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {instagram || "Link do Instagram não informado"}
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
