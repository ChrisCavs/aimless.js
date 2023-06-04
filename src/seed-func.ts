/**
 * Returns a seeded PRNG function
 * @param seed Seed (integer)
 */
const seedFunc = (seed: number): (() => number) => {
  // Park-Miller PRNG
  let currentSeed = seed % 2147483647

  return () => {
    currentSeed = (currentSeed * 16807) % 2147483647
    return (currentSeed - 1) / 2147483646
  }
}

export default seedFunc
