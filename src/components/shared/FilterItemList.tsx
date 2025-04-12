import { useToggleTypeStore } from "../../states/toggle-type-store";

type FilterItemListProps = {
  filterOptionTypes: string[];
  filterOptionLanguages: string[];
  filters: any;
  handleFiltersChange: any;
};

export default function FilterItemList({
  filterOptionTypes,
  filterOptionLanguages,
  filters,
  handleFiltersChange,
}: FilterItemListProps) {
  const { toggleType } = useToggleTypeStore();

  const labelStyle = `flex items-center gap-3 text-base text-dark font-normal pointer-events-none`;
  const inputStyle = `h-5 w-5 text-blue-600 border-2 border-[#BFBFBF] rounded-sm focus:ring-blue-500 pointer-events-auto cursor-pointer`;

  return (
    <div className="flex gap-4 flex-col">
      {toggleType
        ? filterOptionTypes.map((type) => (
            <label key={type} className={labelStyle}>
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={() => handleFiltersChange("type", type)}
                className={inputStyle}
              />
              {type}
            </label>
          ))
        : filterOptionLanguages.map((language) => (
            <label key={language} className={labelStyle}>
              <input
                type="checkbox"
                checked={
                  filters.language ===
                  (language === "All Languages" ? "" : language)
                }
                onChange={() =>
                  handleFiltersChange(
                    "language",
                    language === "All Languages" ? "" : language
                  )
                }
                className={inputStyle}
              />
              {language}
            </label>
          ))}
    </div>
  );
}
