import { defaultEngine } from "./utils.js"

/**
 * Returns a random value that follows a custom distribution
 * @param {(num: number) => *} func Distribution function that accepts a random number between 0 and 1
 * @param {() => number} engine PRNG of choice
 * @returns {*}
 */
const customDist = (func, engine = defaultEngine) => {
  return func(engine())
}

/**
 * @param {() => number} engine Distribution function that accepts a random number between 0 and 1
 * @returns {(func: (num: number) => *) => *}
 */
const customDistWithEngine = (engine = defaultEngine) => {
  return (func) => customDist(func, engine)
}

export {
  customDist,
  customDistWithEngine
}