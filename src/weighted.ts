import { Engine, defaultEngine } from "./utils"

const weighted = <T>(array: T[] | readonly T[], weights: number[], engine: Engine = defaultEngine): T => {
  if (array.length !== weights.length) {
    throw new Error('Every provided item must have a corresponding weight.')
  }

  const totalWeight = weights.reduce(
    (sum, weight) => sum + weight, 0
  )

  const rand = engine() * totalWeight

  let cumulativeWeight = 0
  let selectedIndex = 0

  for (let i = 0; i < array.length; i++) {
    cumulativeWeight += weights[i]

    if (rand < cumulativeWeight) {
      selectedIndex = i
      break
    }
  }

  return array[selectedIndex]
}

const weightWithEngine = <T>(engine = defaultEngine) => {
  return (array: T[] | readonly T[], weights: number[]) => weighted(array, weights, engine)
}

export {
  weighted,
  weightWithEngine
}
