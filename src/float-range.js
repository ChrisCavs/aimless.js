import { defaultEngine } from "./utils.js"

/**
 * Returns a random number within the float range
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
const floatRange = (min, max, engine = defaultEngine) => {
  return engine() * (max - min) + min
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(min: number, max: number) => number}
 */
const floatRangeWithEngine = (engine = defaultEngine) => {
  return (min, max) => floatRange(min, max, engine)
}

export {
  floatRange,
  floatRangeWithEngine
}
