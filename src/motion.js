import { useReducedMotion } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1];
export const motionTransition = { duration: 0.42, ease: motionEase };
export const motionFast = { duration: 0.2, ease: motionEase };
export const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: motionFast }, exit: { opacity: 0, transition: { duration: 0.14, ease: motionEase } } };
export const panelVariants = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: motionTransition }, exit: { opacity: 0, x: -8, transition: { duration: 0.18, ease: motionEase } } };

export function useMotionVariants() {
  const reduced = useReducedMotion();
  const distance = reduced ? 0 : 16;
  return {
    reduced,
    page: {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0, transition: motionTransition },
      exit: { opacity: 0, y: reduced ? 0 : -10, transition: { duration: 0.2, ease: motionEase } },
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: reduced ? 0 : 0.07 } },
    },
    item: {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0, transition: motionTransition },
    },
  };
}
