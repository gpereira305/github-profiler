import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="bg-gray sm:min-h-[70vh] min-h-[40vh] rounded-md items-center justify-center flex flex-col">
      <h1 className="text-lg text-red-500 font-bold text-center">Erro 404</h1>
      <p
        className="
        text-base text-dark font-normal text-center mb-6
      "
      >
        O conteúdo que você está procurando não existe.
      </p>
      <Link
        className="
        text-base text-secondary font-seminbold text-center underline
      "
        to="/"
      >
        Voltar
      </Link>
    </div>
  );
}
