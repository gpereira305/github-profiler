import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserProfileSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex mx-auto">
        <Skeleton
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "100%",
            display: "flex",
          }}
        />
      </div>
      <div className="flex mx-auto">
        <Skeleton count={2} width={200} />
      </div>
      <br />
      <br />
      <Skeleton count={4} />
    </div>
  );
}
