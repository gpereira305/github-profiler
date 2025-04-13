import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DetailsSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <Skeleton count={6} height={80} style={{ marginBottom: "20px" }} />
    </div>
  );
}
