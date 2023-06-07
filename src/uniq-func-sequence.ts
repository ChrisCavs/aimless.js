import { Engine, defaultEngine, randIntRange, sliceOut } from './utils'

const uniqFuncSequence = <T>(arr: T[], engine: Engine = defaultEngine): () => (T | null) => {
  let tempArr = arr.slice()

  return () => {
    if (!tempArr.length) return null

    const i = randIntRange(0, tempArr.length - 1, engine)
    const result = tempArr[i]

    tempArr = sliceOut(tempArr, i)

    return result
  }
}

export default uniqFuncSequence
