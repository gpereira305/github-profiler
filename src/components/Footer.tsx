export default function Footer() {
  return (
    <footer className="mt-auto w-full flex flex-col items-center justify-center gap-4 py-2 px-4 sm:px-8 bg-secondary min-h-[70px]">
      <p
        className="
        text-sm text-dark font-normal
      "
      >
        Github Profiler | © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
