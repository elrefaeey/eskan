import type { Transition } from "framer-motion";

export const jobsActiveLineTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const JOBS_FORM_IN_VIEW = {
  once: true,
  margin: "-100px",
} as const;

export const jobsFormFieldTransition: Transition = {
  duration: 0.3,
};
