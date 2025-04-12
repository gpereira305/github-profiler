import useFetchUserData from "../hooks/useFetchUserData";
import { useQueryStore } from "../states/query-store";

export default function Filters() {
  const { searchQuery } = useQueryStore();

  const { handleChange, handleKeyDown, handleClearSearch } =
    useFetchUserData() ?? {};

  return (
    <div className="flex items-center justify-between max-w-[500px] bg-light_color mb-4 rounded-sm h-10">
      <input
        className="w-full px-4 py-2 rounded-lg bg-light_color"
        type="search"
        placeholder="Search for a user"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span
        className="hidden text-sm font-semibold cursor-pointer text-dark_color"
        onClick={handleClearSearch}
      >
        clear search
      </span>
    </div>
  );
}
