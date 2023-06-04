import { Engine, defaultEngine, randIntRange, sliceOut } from './utils'

const sequence = <T>(arr: T[], engine: Engine = defaultEngine): T[] => {
  const result: T[] = []

  let tempArr: T[] = arr
  let i: number

  while (result.length < arr.length) {
    i = randIntRange(0, tempArr.length - 1, engine)
    result.push(tempArr[i])
    tempArr = sliceOut(tempArr, i)
  }

  return result
}

const sequenceWithEngine = <T>(engine: Engine = defaultEngine) => {
  return (arr: T[]) => sequence(arr, engine)
}

export {
  sequence,
  sequenceWithEngine
}
