import { generateCurry } from "./utils"

/**
 * Returns a valid RFC4122 version4 ID hex string, using the provided engine
 * @param engine PRNG of choice
 */
const uuid = (engine = Math.random) => {
  // Credit @Alexey Silin from https://gist.github.com/1308368
  var a = ''
  var b = ''
  for (b = a = ''; a++ < 36; b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ engine() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-') {}
  return b
}

const uuidWithEngine = generateCurry(uuid)

export {
  uuid,
  uuidWithEngine
}
