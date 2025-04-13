import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ReposListSkeleton() {
  const skeletonProps = {
    count: 1,
    width: "45%",
  };

  return (
    <div className="flex flex-col p-2 mb-6">
      <Skeleton {...skeletonProps} />
      <Skeleton count={3} height={10} />
      <Skeleton width="20%" />
      <br />
      <Skeleton {...skeletonProps} />
      <Skeleton count={3} height={10} />
      <Skeleton width="20%" />
      <br />
      <Skeleton {...skeletonProps} />
      <Skeleton count={3} height={10} />
      <Skeleton width="20%" />
      <br />
      <Skeleton {...skeletonProps} />
      <Skeleton count={3} height={10} />
      <Skeleton width="20%" />
    </div>
  );
}
