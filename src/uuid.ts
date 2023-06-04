import { defaultEngine, generateCurry } from './utils'

// TODO: consider using a uuid function that is not code golf
// - better for readability
// - better for types and linter

/**
 * Returns a valid RFC4122 version4 ID hex string, using the provided engine
 * @param engine PRNG of choice
 */
/* eslint-disable */
const uuid = (engine = defaultEngine): string => {
  // Credit @Alexey Silin from https://gist.github.com/1308368
  let a = "";
  let b = "";
  for (
    b = a = "";
    // @ts-expect-error
    a++ < 36;
    b +=
      // @ts-expect-error
      ~a % 5 | ((a * 3) & 4)
        ? // @ts-expect-error
          (a ^ 15 ? 8 ^ (engine() * (a ^ 20 ? 16 : 4)) : 4).toString(16)
        : "-"
  ) {}
  return b;
};
/* eslint-enable */

const uuidWithEngine = generateCurry(uuid)

export { uuid, uuidWithEngine }
