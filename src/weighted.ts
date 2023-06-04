import { defaultEngine, generateCurry } from './utils'

/**
 * Returns a random value from the provided array, biased towards provided weights
 * @param nums Array of numbers (integer or float)
 * @param weights Array of weights (integer or float)
 * @param engine PRNG of choice
 */
const weighted = (
  nums: number[],
  weights: number[],
  engine = defaultEngine
): number => {
  if (nums.length !== weights.length) {
    throw new Error('Every provided number must have a corresponding weight.')
  }

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

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

const weightWithEngine = generateCurry(weighted)

export { weighted, weightWithEngine }
