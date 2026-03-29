import { Spinner } from "../ui/spinner";

export function LoadingLazy() {
  return (
    <div className="absolute inset-0 z-9999 text-sm text-black-400">
      <Spinner />
    </div>
  );
}
