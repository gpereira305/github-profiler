import Image from "./shared/Image";
import gitHubLogo from "../assets/imgs/github-logo.svg";
import { GithubIcon } from "./Icons";

export default function Header() {
  return (
    <header className="h-16 sm:h-[72px] bg-tertiary w-full header-width text-primary content-center ">
      <div className="flex gap-6 w-max items-end">
        <figure className="flex items-center gap-3">
          <GithubIcon />
          <Image src={gitHubLogo} title="Github" className="w-[84px] h-8" />
        </figure>{" "}
        / <span className="text-base font-light text-primary">Profile</span>
      </div>
    </header>
  );
}
