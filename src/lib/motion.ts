export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
}

export const springSm = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.7,
}
