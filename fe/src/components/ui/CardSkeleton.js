import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className="relative group" key={i}>
        <div className="overflow-hidden aspect-w-1 aspect-h-1">
          <Skeleton className="h-full" />
        </div>
        <div className="flex items-start justify-between mt-4 space-x-4">
          <div className="w-2/3">
            <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
              <Skeleton className="w-full" height={20} count={2} />
              <span className="absolute inset-0" aria-hidden="true" />
            </h3>
            <div className="flex items-center mt-2.5 space-x-px w-full">
              <Skeleton width={80} height={20} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
              <Skeleton width={40} height={20} />
            </p>
          </div>
        </div>
      </div>
    ));
}
