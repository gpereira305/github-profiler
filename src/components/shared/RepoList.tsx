import { ReposListTypes } from "../../types";
import { ForkIcon, StarFilledIcon } from "../Icons";

export default function RepoList({ data }: { data: ReposListTypes[] }) {
  return (
    <ul className="flex flex-col gap-10 p-2">
      {data?.map(({ name, highlight, desc, language, forks, stars }, index) => (
        <li key={index}>
          <h2 className="text-lg text-dark font-light">
            {name} /{" "}
            <span className="text-secondary font-bold">{highlight}</span>
          </h2>
          <p className="text-sm text-dark-light pb-3">{desc}</p>
          <div className="flex items-center gap-2 justify-between w-full max-w-[200px]">
            {stars ? (
              <span className="text-sm text-dark font-normal flex items-center gap-2">
                <StarFilledIcon fill="#000" /> {stars}
              </span>
            ) : (
              <span className="text-sm text-dark font-normal"> {language}</span>
            )}

            <span className="text-sm text-dark font-normal flex items-center gap-2">
              {forks !== null && (
                <>
                  <ForkIcon />
                  {forks}
                </>
              )}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
