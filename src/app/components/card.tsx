import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CardProps {
  imageSrc: string;
  cardTitle: { title: string; href?: string };
  subtitle: string;
  quantity: number;
  showQuantity: boolean;
  isLoading: boolean;
}

function Card({
  imageSrc,
  cardTitle,
  subtitle,
  quantity,
  showQuantity,
  isLoading,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & CardProps) {
  const [value, setValue] = useState(0);
  const [increment, setIncrement] = useState(quantity / 10);

  useEffect(() => {
    setValue(0);
    setIncrement(quantity / 10);
  }, [quantity]);

  useEffect(() => {
    if (!showQuantity) return;

    const interval = setInterval(() => {
      const newValue = value + increment;

      if (newValue >= quantity) {
        clearInterval(interval);
        setValue(quantity);
        return;
      }

      if (newValue > quantity / 2) {
        setIncrement((prev) => Math.max(prev / 1.5, quantity / 100));
      }

      setValue(+newValue.toFixed(0));
    }, 50);

    return () => clearInterval(interval);
  }, [value, quantity, increment, showQuantity]);

  return (
    <div
      className={clsx(
        "from-80%% size-[500px] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-400 p-1 max-lg:h-1/2 max-lg:w-full max-lg:overflow-hidden max-lg:rounded-none max-lg:p-0",
        props.className,
        !isLoading ? "animate-fadeIn opacity-0" : "animate-fadeOut opacity-100",
      )}
    >
      <div className="relative size-full overflow-hidden rounded-lg max-lg:rounded-none">
        {!showQuantity && (
          <div className="absolute inset-0 m-auto bg-gradient-to-b from-transparent from-40% to-neutral-950/90" />
        )}
        <div
          className={clsx(
            "absolute inset-0 z-20 flex select-none flex-col items-center justify-center",
            showQuantity
              ? "visible animate-[fadeIn_400ms_ease-in_300ms_1_normal_both]"
              : "invisible",
          )}
        >
          <span className="font-outfit text-5xl font-bold tracking-wide">
            {value.toLocaleString()}
          </span>
          <span className="text-3xl font-medium">seguidores</span>
        </div>
        {isLoading ? (
          <div className="size-full bg-neutral-600"></div>
        ) : (
          <Image
            loader={() => imageSrc}
            src={imageSrc}
            alt={cardTitle.title}
            width={450}
            height={450}
            className={clsx(
              "size-full select-none object-cover transition-all duration-300",
              showQuantity ? "brightness-[30%] saturate-0" : "",
              isLoading && "hidden",
            )}
          />
        )}
        {!isLoading && (
          <div
            className={clsx(
              "absolute bottom-7 left-0 right-0 z-20 m-auto flex w-fit flex-col items-center transition-all max-lg:bottom-16",
            )}
          >
            <a
              href={cardTitle.href || ""}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "text-center text-4xl font-semibold leading-9 decoration-1 drop-shadow hover:underline",
                showQuantity ? "text-neutral-300" : "text-neutral-50",
                !cardTitle.href ? "pointer-events-none hover:no-underline" : "",
              )}
            >
              {cardTitle.title}
            </a>
            {!showQuantity && (
              <span className="text-xl capitalize text-neutral-200">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
