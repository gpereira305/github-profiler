import Button from "./Button";
import { ChevronIcon } from "../Icons";

type ShowAllButtonProps = {
  userRepos: any;
  showAll: boolean;
  setShowAll: any;
  itemsToDisplay: number;
};
export default function ShowAllButton({
  userRepos,
  showAll,
  setShowAll,
  itemsToDisplay,
}: ShowAllButtonProps) {
  return (
    !showAll &&
    userRepos &&
    userRepos.length > itemsToDisplay && (
      <Button onClick={() => setShowAll(true)}>
        <ChevronIcon />
        Ver todos
      </Button>
    )
  );
}
