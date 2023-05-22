import { defaultEngine, randIntRange, sliceOut } from './utils'

/**
 * Returns a PRNG function that returns unique values from the provided array.
 * @param arr Array of values to pull from
 * @param engine Engine to be used as PRNG
 */
const uniqFuncSequence = (arr, engine = defaultEngine) => {
  let tempArr = arr

  return () => {
    if (!tempArr.length) return null

    const i = randIntRange(0, tempArr.length - 1, engine)
    const result = tempArr[i]

    tempArr = sliceOut(tempArr, i)

    return result
  }
}

export default uniqFuncSequence
