import { defaultEngine, generateCurry } from "./utils.js"

/**
 * Returns a random value that follows a custom distribution
 * @param func Distribution function that accepts a random number between 0 and 1
 * @param engine PRNG of choice
 */
const customDist = (func, engine = defaultEngine) => {
  return func(engine())
}

const customDistWithEngine = generateCurry(customDist)

export {
  customDist,
  customDistWithEngine
}