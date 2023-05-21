import { generateCurry } from "./utils"

/**
 * Returns a random value that follows an exponential distribution
 * @param lambda Lambda
 * @param engine PRNG of choice
 */
const exponentialDist = (lambda, engine = Math.random) => {
  return -Math.log(1 - engine()) / lambda
}

const exponentialDistWithEngine = generateCurry(exponentialDist)

export {
  exponentialDist,
  exponentialDistWithEngine
}
