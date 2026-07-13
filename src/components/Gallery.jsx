import { chapters } from "../data/gallery";
import GalleryChapter from "./GalleryChapter";
import Reveal from "./Reveal";

export default function Gallery() {
  return (
    <div id="galeria" className="relative bg-ink">
      <Reveal className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-32 lg:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brass-light">Galeria</p>
        <h2 className="font-display text-4xl font-medium leading-[1.1] text-bone sm:text-5xl">
          A história do espaço, contada em capítulos.
        </h2>
      </Reveal>

      {chapters.map((chapter, i) => (
        <GalleryChapter
          key={chapter.title}
          title={chapter.title}
          index={i}
          photos={chapter.photos}
          dense={chapter.dense}
        />
      ))}
    </div>
  );
}
