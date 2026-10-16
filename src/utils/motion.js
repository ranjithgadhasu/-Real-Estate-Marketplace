export const editorialEase = [0.22, 1, 0.36, 1];

export const heroSequence = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2, staggerChildren: 0.18 },
  },
};

export const riseIn = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: editorialEase },
  },
};