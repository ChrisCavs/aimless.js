import { generateCurry } from "./utils"

/**
 * Returns a random value that follows a normal distribution
 * @param mean Mean
 * @param stdDev Standard Deviation
 * @param engine PRNG of choice
 */
const normalDist = (mean, stdDev, engine = Math.random) => {
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

const normalDistWithEngine = generateCurry(normalDist)

export {
  normalDist,
  normalDistWithEngine
}
