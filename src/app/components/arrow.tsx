import clsx from "clsx";

function Arrow({ orientation }: { orientation: "up" | "down" }) {
  return (
    <svg
      width="52"
      height="34"
      viewBox="0 0 52 34"
      fill="none"
      className={clsx(
        "h-[40px] w-[60px] transition-all hover:scale-105",
        orientation === "up" ? "text-green-500" : "rotate-180 text-red-500",
      )}
    >
      <path
        d="M22.9402 1.63416C24.5384 -0.26411 27.4616 -0.264108 29.0598 1.63416L50.7739 27.4237C52.9643 30.0252 51.1149 34 47.714 34H4.28599C0.885134 34 -0.964257 30.0252 1.22615 27.4237L22.9402 1.63416Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Arrow;
