import { Spinner } from "../ui/spinner";

export function LoadingLazy() {
    return (
        <div className="absolute inset-0 z-[9999] bg-black text-sm text-black-400">
           <Spinner />
        </div>
    );
}