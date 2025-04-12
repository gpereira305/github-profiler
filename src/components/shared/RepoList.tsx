import { ReposListTypes } from "../../types";
import { ForkIcon, StarFilledIcon } from "../Icons";

export default function RepoList({ data, isLoading, isError }: ReposListTypes) {
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar repositórios.</div>;
  }
  console.log(data);
  return (
    <ul className="flex flex-col gap-10 p-2">
      {data?.map(
        (
          { name, html_url, description, language, forks, stars, owner },
          index
        ) => (
          <li key={index}>
            <article className="flex items-center gap-2">
              <h2 className="text-lg text-dark font-light">{owner.login} / </h2>
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="text-secondary font-bold"
              >
                {name}
              </a>
            </article>
            {description && (
              <p className="text-sm text-dark-light">{description}</p>
            )}

            <div className="flex items-center gap-2 justify-between w-full max-w-[200px] pt-3">
              {stars ? (
                <span className="text-sm text-dark font-normal flex items-center gap-2">
                  <StarFilledIcon fill="#000" /> {stars}
                </span>
              ) : (
                <span className="text-sm text-dark font-normal">
                  {" "}
                  {language}
                </span>
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
        )
      )}
    </ul>
  );
}
