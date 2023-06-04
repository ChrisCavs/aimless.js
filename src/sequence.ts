import { intRange } from './int-range'
import { defaultEngine, generateCurry, sliceOut } from './utils'

/**
 * Returns a new array with randomized order
 * @param arr Array of values
 * @param engine PRNG of choice
 */
const sequence = <T>(arr: T[], engine = defaultEngine): T[] => {
  const result = []

  let tempArr = arr
  let i

  while (result.length < arr.length) {
    i = intRange(0, tempArr.length - 1, engine)
    result.push(tempArr[i])
    tempArr = sliceOut(tempArr, i)
  }

  return result
}

const sequenceWithEngine = generateCurry(sequence)

export { sequence, sequenceWithEngine }