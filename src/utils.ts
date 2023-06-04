declare global {
  interface Window {
    msCrypto: Window['crypto']
  }
}

const defaultEngine = (): number => {
  try {
    // Credit @ Tamás Sallai
    const crypto = window.crypto ?? window.msCrypto
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

const generateListFromRange = (min: number, max: number): number[] => {
  const result = []

  for (let i = min; i <= max; i++) {
    result.push(i)
  }

  return result
}

const randIntRange = (i: number, j: number, engine = defaultEngine): number => {
  const min = Math.ceil(i)
  const max = Math.floor(j)

  return Math.floor(engine() * (max - min + 1)) + min
}

const sliceOut = <T>(arr: T[], i: number): T[] => {
  return arr.slice(0, i).concat(arr.slice(i + 1))
}

const generateCurry = <T extends (...args: any[]) => any>(func: T) => {
  return (engine = defaultEngine) => {
    return (...args: Parameters<T>): ReturnType<T> => {
      return func(...args, engine)
    }
  }
}

export {
  generateListFromRange,
  randIntRange,
  sliceOut,
  generateCurry,
  defaultEngine
}
