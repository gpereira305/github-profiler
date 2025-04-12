import { useState } from "react";
import { ReposListTypes } from "../types";

export default function useShowAllContent({ data }: ReposListTypes) {
  const [showAll, setShowAll] = useState(false);
  const itemsToDisplay = 4;

  const displayedRepos = showAll ? data : data?.slice(0, itemsToDisplay);

  return {
    displayedRepos,
    showAll,
    setShowAll,
    itemsToDisplay,
  };
}
