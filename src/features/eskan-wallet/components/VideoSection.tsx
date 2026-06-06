'use client'

import useLinks from "../hooks/useLinks";

export default function VideoSection() {
  const { data, isLoading } = useLinks();

  return (
    <section className="w-full py-6  container lg:!px-0">
      <h3 className="text-xl lg:text-3xl font-bold text-[#558B2F] mb-4">
        فيديو تعريفي
      </h3>

      {isLoading ? (
        <div className="w-full aspect-video rounded-xl bg-gray-300 animate-pulse" />
      ) : (
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${data?.links?.[2]?.link}`}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
    </section>
  );
}
