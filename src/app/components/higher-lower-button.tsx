import Arrow from "@/app/components/arrow";
import { CheckIcon, XIcon } from "@/app/components/icons";
import clsx from "clsx";

interface Props {
  handleHigher: () => void;
  handleLower: () => void;
  isComparing: boolean;
  isGuessCorrect: boolean | null;
}

function HigherLowerButton({
  handleHigher,
  handleLower,
  isComparing,
  isGuessCorrect,
}: Props) {
  return (
    <div className="absolute left-0 right-0 z-30 m-auto size-32">
      <div className="relative h-full animate-scaleIn overflow-hidden rounded-full bg-neutral-900 shadow-xl">
        <div className="flex h-full flex-col items-center justify-center gap-[10px] p-3">
          <button
            type="button"
            aria-label="Más alto"
            disabled={isComparing || isGuessCorrect !== null}
            onClick={handleHigher}
          >
            <Arrow orientation="up" />
          </button>
          <button
            type="button"
            aria-label="Más bajo"
            disabled={isComparing || isGuessCorrect !== null}
            onClick={handleLower}
          >
            <Arrow orientation="down" />
          </button>
        </div>
        {isGuessCorrect !== null && (
          <div
            className={clsx(
              "absolute inset-0 grid animate-up place-items-center rounded-full",
              isGuessCorrect ? "bg-green-600" : "bg-red-500",
            )}
          >
            {isGuessCorrect ? (
              <CheckIcon className="size-16" strokeWidth={3} />
            ) : (
              <XIcon className="size-16" strokeWidth={3} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HigherLowerButton;
