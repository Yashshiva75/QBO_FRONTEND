export default function Logo({ size = "md" }) {
  const box = size === "sm" ? "w-7 h-7" : "w-10 h-10";
  const icon = size === "sm" ? 14 : 20;

  return (
    <div className={`${box} bg-black rounded-sm flex items-center justify-center`}>
      <svg width={icon} height={icon} viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" fill="white" />
        <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.5" />
        <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.5" />
        <rect x="11" y="11" width="7" height="7" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}