import { defaultEngine } from "./utils.js"

/**
 * Returns a random value that follows a normal distribution
 * @param {number} mean Mean
 * @param {number} stdDev Standard Deviation
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
const normalDist = (mean, stdDev, engine = defaultEngine) => {
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

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(mean: number, stdDev: number) => number}
 */
const normalDistWithEngine = (engine = defaultEngine) => {
  return (mean, stdDev) => normalDist(mean, stdDev, engine)
}

export {
  normalDist,
  normalDistWithEngine
}
