import { defaultEngine } from "./utils.js"

/**
 * Returns a random value that follows an exponential distribution
 * @param {number} lambda Lambda
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
const exponentialDist = (lambda, engine = defaultEngine) => {
  return -Math.log(1 - engine()) / lambda
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(lambda: number) => number}
 */
const exponentialDistWithEngine = (engine = defaultEngine) => {
  return (lambda) => exponentialDist(lambda, engine)
}

export {
  exponentialDist,
  exponentialDistWithEngine
}
