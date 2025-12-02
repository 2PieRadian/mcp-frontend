import { useAuth } from "../../context/AuthContext";

export default function ContactCard() {
  const { user } = useAuth();

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Contact
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[11px] sm:text-xs text-gray-500">Email</p>
          <p className="font-medium break-all text-[13px] sm:text-[14px]">
            {user?.email}
          </p>
        </div>
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[11px] sm:text-xs text-gray-500">Phone</p>
          <p className="font-medium text-[13px] sm:text-[14px]">
            {user?.phoneNumber || "Not added"}
          </p>
        </div>
      </div>
    </div>
  );
}
