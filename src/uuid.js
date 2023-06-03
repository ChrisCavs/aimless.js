import { defaultEngine } from "./utils.js"

/**
 * Returns a valid RFC4122 version4 ID hex string, using the provided engine
 * @param {() => number} engine PRNG of choice
 * @returns {string}
 */
const uuid = (engine = defaultEngine) => {
  // Credit @Alexey Silin from https://gist.github.com/1308368
  /** @type {*} */
  let a = ''
  /** @type {*} */
  let b = ''
  for (b = a = ''; a++ < 36; b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ engine() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-') {}
  return b
}

/**
 * 
 * @param {() => number} engine PRNG of choice
 * @returns {() => string}
 */
const uuidWithEngine = (engine = defaultEngine) => {
  return () => uuid(engine)
}

export {
  uuid,
  uuidWithEngine
}
