import { defaultEngine, randIntRange, sliceOut } from './utils'

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
