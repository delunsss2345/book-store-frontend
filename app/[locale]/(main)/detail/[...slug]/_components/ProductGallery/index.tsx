import Image from "next/image";

export function ProductGallery({
  coverImageUrl,
  title,
}: {
  coverImageUrl: string | null | undefined;
  title: string;
}) {
  return (
    <section className="lg:col-span-5">
      <div className=" flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex flex-row gap-3 overflow-x-auto pb-2 md:w-20 md:flex-col md:overflow-y-visible md:pb-0">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              className="relative aspect-[3/4] w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 transition-all hover:border-black md:w-full"
            >
              {coverImageUrl && (
                <Image
                  src={coverImageUrl}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>

        {/* Ảnh chính - Thêm max-h để không quá cao trên màn hình lớn */}
        <div className="relative flex-1">
          <div className="relative aspect-[3/4] w-full max-w-[450px] mx-auto overflow-hidden rounded-xl bg-[#fdfdfd] shadow-2xl shadow-neutral-200/50">
            {coverImageUrl ? (
              <div className="relative h-full w-full p-4 md:p-10">
                <Image
                  src={coverImageUrl}
                  alt={title}
                  fill
                  priority
                  className="object-contain drop-shadow-[2px_10px_20px_rgba(0,0,0,0.15)]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            ) : (
              <div className="h-full w-full bg-neutral-100 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
