import Lottie from "lottie-react"
import hero from "@/assets/hero.json"

export default function HeroLottie() {
  return (
    <Lottie
      animationData={hero}
      loop
      autoplay
      style={{ width: 260, height: 260 }}
      className="drop-shadow"
    />
  )
}
