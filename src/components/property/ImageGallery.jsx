import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';

export default function ImageGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowRight') setActive((index) => (index + 1) % images.length);
      if (event.key === 'ArrowLeft') setActive((index) => (index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [lightbox, images.length]);

  return (
    <>
      <div>
        <div className="relative overflow-hidden rounded-[5px] bg-gray-200">
          <button type="button" onClick={() => setLightbox(true)} aria-label={`Open photo ${active + 1} of ${images.length} in gallery`} className="block w-full">
            <motion.img
              key={active}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              src={images[active]}
              alt={`${title}, view ${active + 1}`}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[2.1]"
            />
          </button>
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
              <button type="button" aria-label="Previous image" onClick={() => setActive((index) => (index - 1 + images.length) % images.length)} className="flex h-9 w-9 items-center justify-center bg-[#f8f7f3]/95 text-primary-900 hover:bg-white"><ArrowLeft size={17} strokeWidth={1.5} /></button>
              <button type="button" aria-label="Next image" onClick={() => setActive((index) => (index + 1) % images.length)} className="flex h-9 w-9 items-center justify-center bg-[#f8f7f3]/95 text-primary-900 hover:bg-white"><ArrowRight size={17} strokeWidth={1.5} /></button>
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid w-full grid-cols-4 gap-2 sm:flex sm:w-auto sm:gap-3">
            {images.map((image, index) => (
              <button
                key={image + index}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={active === index}
                className={`w-full overflow-hidden rounded-[3px] border-b-2 pb-1.5 transition-opacity sm:w-20 sm:shrink-0 ${active === index ? 'border-primary-900 opacity-100' : 'border-transparent opacity-55 hover:opacity-100'}`}
              >
                <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setLightbox(true)} className="inline-flex shrink-0 items-center self-end gap-2 text-[12px] font-medium text-primary-900 hover:opacity-60 sm:self-auto">
            <Maximize2 size={14} strokeWidth={1.5} /> <span className="hidden sm:inline">View all photos</span> ({images.length})
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} photo gallery`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101c17]/98 px-4 py-16"
          >
            <button type="button" aria-label="Close gallery" onClick={() => setLightbox(false)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white sm:right-8 sm:top-6"><X size={25} strokeWidth={1.4} /></button>
            <button type="button" aria-label="Previous image" onClick={() => setActive((index) => (index - 1 + images.length) % images.length)} className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white/20 sm:left-8"><ArrowLeft size={23} strokeWidth={1.5} /></button>
            <motion.img key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }} src={images[active]} alt={`${title}, view ${active + 1}`} className="max-h-[80vh] max-w-[min(88vw,1300px)] object-contain" />
            <button type="button" aria-label="Next image" onClick={() => setActive((index) => (index + 1) % images.length)} className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white/20 sm:right-8"><ArrowRight size={23} strokeWidth={1.5} /></button>
            <span className="absolute bottom-5 text-[12px] tracking-[.12em] text-white/75">{active + 1} / {images.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}