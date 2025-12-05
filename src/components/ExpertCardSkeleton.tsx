export default function ExpertCardSkeleton() {
  return (
    <div className="Expert-Card border flex flex-col justify-between border-[#B5B5B5] p-[15px] min-[800px]:p-[15px] relative rounded-[15px] w-full animate-pulse">
      <div className="flex items-start justify-between gap-[16px] min-[800px]:gap-[20px]">
        <div className="Profile-Image flex flex-col flex-1">
          {/* Profile Image Skeleton */}
          <div className="w-full h-[120px] bg-gray-200 rounded-[10px] mb-[8px]"></div>

          {/* View Profile Button Skeleton */}
          <div className="w-full h-[28px] bg-gray-200 rounded-[20px]"></div>
        </div>

        <div className="Profile-Details flex flex-col flex-2">
          {/* Name and Rating Container */}
          <div className="Name-Container flex items-center justify-between mb-[4px]">
            <div className="h-[18px] w-[140px] bg-gray-200 rounded"></div>
            <div className="flex items-center gap-[5px]">
              <div className="h-[18px] w-[18px] bg-gray-200 rounded"></div>
              <div className="h-[16px] w-[30px] bg-gray-200 rounded"></div>
              <div className="h-[14px] w-[40px] bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Specialization Skeleton */}
          <div className="h-[14px] w-[200px] bg-gray-200 rounded mb-[8px]"></div>

          {/* Tags Skeleton */}
          <div className="h-[14px] w-[180px] bg-gray-200 rounded mb-[8px]"></div>

          {/* Languages Skeleton */}
          <div className="h-[14px] w-[150px] bg-gray-200 rounded mb-[8px]"></div>

          {/* Next Slot Skeleton */}
          <div className="flex items-center gap-[4px] mb-[8px]">
            <div className="h-[14px] w-[100px] bg-gray-200 rounded"></div>
            <div className="h-[14px] w-[120px] bg-gray-200 rounded"></div>
          </div>

          {/* Price Container Skeleton */}
          <div className="flex items-center gap-[8px]">
            <div className="h-[24px] w-[80px] bg-gray-200 rounded"></div>
            <div className="h-[14px] w-[120px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Book Session Button Skeleton */}
      <div className="mt-[16px] h-[40px] bg-gray-200 rounded-[20px]"></div>
    </div>
  );
}
