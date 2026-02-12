type StatBarProps = {
  value: number;
};

export default function StatBar({ value }: StatBarProps) {
  const safeValue = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < safeValue;

        return (
          <div
            key={i}
            className={`h-6 w-10 rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm transition-all border-2
              ${filled 
                ? "bg-gradient-to-t from-[#8EB3BE] to-white"
                : " border-white/40 bg-transparent"
              }`}
          />
        );
      })}
    </div>
  );
}
