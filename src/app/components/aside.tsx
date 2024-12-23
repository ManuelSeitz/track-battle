import clsx from "clsx";

function Aside({
  children,
  side,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> & {
  side: "left" | "right";
}) {
  return (
    <aside
      {...props}
      className={clsx(
        "z-10 h-full border-2 border-dashed border-transparent bg-neutral-800 p-6 drop-shadow max-2xl:absolute max-2xl:top-0 max-2xl:border-none max-2xl:bg-transparent max-lg:p-3",
        side === "left"
          ? "border-r-neutral-500 max-2xl:left-0"
          : "border-l-neutral-500 max-2xl:right-0",
        props.className,
      )}
    >
      {children}
    </aside>
  );
}

export default Aside;
