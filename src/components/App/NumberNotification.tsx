export default function NumberNotification({ count }: { count: number }) {
  return (
    <div
      className={`absolute rounded-full ${
        count > 100
          ? "w-7 h-5 top-[-4px] right-[-12px]"
          : "w-5 h-4 top-0 right-[-6px]"
      } bg-[#be123c] text-white text-xs flex items-center justify-center max-lg:top-6 max-lg:right-20`}
    >
      {count > 100 ? "99+" : count}
    </div>
  );
}
