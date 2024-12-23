import clsx from "clsx";

function Button({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-2xl bg-primary-500 px-5 py-3 text-2xl font-medium text-neutral-950 shadow-md transition-all hover:scale-105 hover:bg-primary-600",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
