import { MouseEventHandler } from "react";

export default function Button({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="mt-4 px-4 py-2 bg-secondary text-white font-bold rounded hover:bg-secondary-dark"
      onClick={onClick}
    >
      Mostrar tudo
    </button>
  );
}
