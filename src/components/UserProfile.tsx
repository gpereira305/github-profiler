import user from "../assets/imgs/user.png";
import {
  BuildingIcon,
  ChainIcon,
  InstagramIcon,
  LocationPinIcon,
} from "./Icons";
import Image from "./shared/Image";

const data = [
  {
    company: "Magazord - plataforma",
    icon: <BuildingIcon />,
  },
  {
    workPlace: "Rio do Sul - SC",
    icon: <LocationPinIcon />,
  },
  {
    socialMedia: "Cordas.hub.uok",
    icon: <ChainIcon />,
  },
  {
    instagram: "Gabriel.s.cordeiro",
    icon: <InstagramIcon />,
  },
];

export default function UserProfile() {
  const userName = "Gabriel Cordeiro";

  return (
    <aside className="flex-1 py-2 px-8 flex justify-center max-w-[380px] flex-col lg:mx-0 mx-auto">
      <figure className="flex items-center bg-primary flex-col gap-4 pb-8">
        <Image
          src={user}
          title={userName}
          className="object-cover w-[150px] h-[150px] rounded-full"
        />
        <figcaption className="text-sm text-dark-light text-center flex-col flex">
          <span className="text-dark text-2xl font-bold">{userName}</span>
          <span className="text-base text-dark-light font-normal">
            Head development team Front-End Magazord - Tagged (#BZ)
          </span>
        </figcaption>
      </figure>

      <ul className="px-8 flex flex-col gap-2">
        {data.map(({ company, workPlace, socialMedia, instagram }, index) => (
          <li
            key={index}
            className="flex items-center gap-4 text-sm text-secondary font-normal"
          >
            {data[index].icon}
            <span>{company || workPlace || socialMedia || instagram}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
