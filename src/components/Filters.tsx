import useFetchUserData from "../hooks/useFetchUserData";
import { useDrawerStore } from "../states/drawer-store";
import { useQueryStore } from "../states/query-store";
import { useToggleTypeStore } from "../states/toggle-type-store";
import { ChevronIcon, CloseIcon, SearchIcon } from "./Icons";
import Button from "./shared/Button";

export default function Filters() {
  const { searchQuery } = useQueryStore();
  const { toggleDrawer } = useDrawerStore();
  const { setToggleType } = useToggleTypeStore();
  const { handleChange, handleKeyDown, handleClearSearch } =
    useFetchUserData() ?? {};

  const handleDrawerToggle = (filterType: string) => {
    setToggleType(filterType === "types");
    toggleDrawer();
  };

  return (
    <>
      <div className="flex items-center justify-between bg-light_color mb-6 h-10 w-full">
        <div className="flex items-center w-full relative max-w-[440px]">
          <SearchIcon className="absolute left-1" />
          <input
            className="
            px-10 w-full py-2 bg-light_color border-b-[1px] border-[#F4F4F4] 
            focus:outline-none focus:border-secondary text-lg text-dark-light font-normal"
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {searchQuery !== "" && (
            <span
              className="text-sm text-dark font-normal flex items-center gap-2"
              onClick={handleClearSearch}
            >
              <CloseIcon className="cursor-pointer absolute right-1" />
            </span>
          )}
        </div>

        <div className="flex gap-4 items-center">
          <Button onClick={() => handleDrawerToggle("types")}>
            <ChevronIcon />
            types
          </Button>
          <Button onClick={() => handleDrawerToggle("languages")}>
            <ChevronIcon />
            languages
          </Button>
        </div>
      </div>
    </>
  );
}
