import { useReducedMotion } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1];
export const motionTransition = { duration: 0.36, ease: motionEase };
export const motionFast = { duration: 0.18, ease: motionEase };
export const motionExit = { duration: 0.16, ease: motionEase };
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionFast },
  exit: { opacity: 0, transition: motionExit },
};
export const panelVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: motionTransition },
  exit: { opacity: 0, x: -8, transition: motionExit },
};
export const popoverVariants = {
  hidden: { opacity: 0, y: -5, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: motionFast },
  exit: { opacity: 0, y: -3, scale: 0.99, transition: motionExit },
};

export function useMotionVariants() {
  const reduced = useReducedMotion();
  const distance = reduced ? 0 : 16;
  return {
    reduced,
    page: {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0, transition: motionTransition },
      exit: { opacity: 0, y: reduced ? 0 : -8, transition: motionExit },
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
