import { useAuth } from "../../context/AuthContext";

const formatDate = (iso?: string) => {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AccountActivityCard() {
  const { user } = useAuth();

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px] sm:col-span-2">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Account activity
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-[8px] sm:gap-[10px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[16px] sm:px-[20px] py-[12px] sm:py-[15px] rounded-[16px] sm:rounded-[20px] flex-1 min-w-0">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            Member since
          </p>
          <p className="font-medium text-[16px] sm:text-[17px]">
            {formatDate(user?.createdAt)}
          </p>
        </div>

        <div className="bg-white px-[16px] sm:px-[20px] py-[12px] sm:py-[15px] rounded-[16px] sm:rounded-[20px] flex-1 min-w-0">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            Last updated
          </p>
          <p className="font-medium text-[16px] sm:text-[17px]">
            {formatDate(
              // @ts-expect-error backend may provide updatedAt even if not in type
              user?.updatedAt || user?.createdAt
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
