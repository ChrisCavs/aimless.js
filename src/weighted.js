import { defaultEngine } from "./utils.js"

/**
 * Returns a random value from the provided array, biased towards provided weights
 * @param {number[]} nums Array of numbers (integer or float)
 * @param {number[]} weights Array of weights (integer or float)
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
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

/**
 * 
 * @param {() => number} engine PRNG of choice
 * @returns {(nums: number[], weights: number[]) => number}
 */
const weightWithEngine = (engine = defaultEngine) => {
  return (nums, weights) => weighted(nums, weights, engine)
}

export {
  weighted,
  weightWithEngine
}
