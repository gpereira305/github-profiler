type FilterItemListProps = {
  filterList: any;
  filterValue: string;
  handleTypeFilterChange: any;
  toggleType: boolean | string | null;
};

export default function FilterItemList({
  filterList,
  filterValue,
  handleTypeFilterChange,
  toggleType,
}: FilterItemListProps) {
  console.log(filterValue);

  return (
    <div className="flex gap-2 flex-col pt-4">
      <h2
        className="
          text-2xl text-dark font-bold pb-10
        "
      >
        {toggleType ? "Types" : "Languages"}
      </h2>
      <div className="flex gap-4 flex-col ">
        {filterList.map((item: any) => (
          <label
            className="flex items-center gap-3 text-base text-dark font-normal"
            key={item.value}
          >
            <input
              type="checkbox"
              checked={filterValue === item.value}
              onChange={() => handleTypeFilterChange(item.value)}
              className="h-5 w-5 text-blue-600 border-2 border-[#BFBFBF] rounded-sm focus:ring-blue-500 cupo"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}
