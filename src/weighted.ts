import { defaultEngine } from "./utils"

const weighted = (nums, weights, engine = defaultEngine) => {
  if (nums.length !== weights.length) {
    throw new Error('Every provided number must have a corresponding weight.')
  }

  const totalWeight = weights.reduce(
    (sum, weight) => sum + weight, 0
  )

  const rand = engine() * totalWeight

  let cumulativeWeight = 0
  let selectedIndex = 0

  for (let i = 0; i < nums.length; i++) {
    cumulativeWeight += weights[i]

    if (rand < cumulativeWeight) {
      selectedIndex = i
      break
    }
  }

  return nums[selectedIndex]
}

const weightWithEngine = (engine = defaultEngine) => {
  return (nums, weights) => weighted(nums, weights, engine)
}

export {
  weighted,
  weightWithEngine
}
