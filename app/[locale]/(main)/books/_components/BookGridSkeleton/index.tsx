import { Skeleton } from "@/components/ui/skeleton";

export default function BooksGridSkeletonCard() {
    return <>
        <div className="flex flex-col gap-3">
            <Skeleton className="aspect-[3/4] w-full rounded-md bg-zinc-200" />
            <Skeleton className="h-4 w-3/4 rounded-md bg-zinc-200" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-1/3 rounded-md bg-zinc-200" />
                <Skeleton className="h-4 w-1/4 rounded-md bg-zinc-200" />
            </div>
        </div></>
}