import { Engine, defaultEngine } from "./utils"

const normalDist = (mean: number, stdDev: number, engine: Engine = defaultEngine): number => {
  // Box-Muller transform
  let u, v, s

  do {
    u = (engine() * 2) - 1
    v = (engine() * 2) - 1
    s = u ** 2 + v ** 2
  } while (s === 0 || s >= 1)

  const t = Math.sqrt((-2 * Math.log(s)) / s)
  const rand = mean + (stdDev * u * t)

  return rand
}

const normalDistWithEngine = (engine = defaultEngine) => {
  return (mean: number, stdDev: number) => normalDist(mean, stdDev, engine)
}

export {
  normalDist,
  normalDistWithEngine
}
