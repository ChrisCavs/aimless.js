/**
 * The default engine for Aimless.js, utilizing crypto when available
 * @returns {number} a number >= 0 and < 1
 */
const defaultEngine = () => {
  try {
    // Credit @ Tamás Sallai
    const crypto = window.crypto || window.msCrypto
    const buffer = new ArrayBuffer(8)
    const ints = new Int8Array(buffer)
    crypto.getRandomValues(ints)

    ints[7] = 63
    ints[6] |= 0xf0

    return new DataView(buffer).getFloat64(0, true) - 1
  } catch (e) {
    return Math.random()
  }
}

/**
 * Generates an array containing integers between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
const generateListFromRange = (min, max) => {
  const result = []

  for (let i = min; i <= max; i++) {
    result.push(i)
  }

  return result
}

/**
 * Generates a random integer within range >= i <= j
 * @param {number} i min
 * @param {number} j max
 * @param {() => number} engine 
 * @returns {number}
 */
const randIntRange = (i, j, engine = defaultEngine) => {
  const min = Math.ceil(i)
  const max = Math.floor(j)

  return Math.floor(engine() * (max - min + 1)) + min
}

/**
 * Slices an item at index i out of the array arr
 * @param {*[]} arr array
 * @param {number} i index
 * @returns {*[]}
 */
const sliceOut = (arr, i) => {
  return arr.slice(0, i).concat(arr.slice(i + 1))
}

export {
  generateListFromRange,
  randIntRange,
  sliceOut,
  defaultEngine,
}