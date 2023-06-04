/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, it } from 'vitest'

import {
  bool,
  boolWithEngine,
  char,
  charWithEngine,
  customDist,
  customDistWithEngine,
  exponentialDist,
  exponentialDistWithEngine,
  floatRange,
  floatRangeWithEngine,
  intRange,
  intRangeWithEngine,
  intSequence,
  intSequenceWithEngine,
  normalDist,
  normalFloat,
  normalFloatWithEngine,
  oneOf,
  oneOfWithEngine,
  seedFunc,
  sequence,
  sequenceWithEngine,
  sign,
  signWithEngine,
  uniqFuncSequence,
  uniqFuncIntRange,
  weighted,
  weightWithEngine
} from './index'

/* eslint-env mocha */

describe('aimless', () => {
  it('should generate curry functions with custom engine', () => {
    const engine = (): 0 => 0
    const bool = boolWithEngine(engine)
    expect(bool()).equal(false)
    const char = charWithEngine(engine)
    expect(char('abc')).equal('a')
    const customDist = customDistWithEngine(engine)
    expect(customDist((rand) => rand)).equal(0)
    const exponential = exponentialDistWithEngine(engine)
    expect(exponential(1)).equal(-Math.log(1))
    const floatRange = floatRangeWithEngine(engine)
    expect(floatRange(1, 2)).equal(1)
    const intRange = intRangeWithEngine(engine)
    expect(intRange(1, 2)).equal(1)
    const intSequence = intSequenceWithEngine(engine)
    expect(intSequence(1, 2)).include(1).and.include(2)
    const normalFloat = normalFloatWithEngine(engine)
    expect(normalFloat()).equal(-1)
    const oneOf = oneOfWithEngine(engine)
    expect(oneOf([1, 2, 3])).equal(1)
    const sequence = sequenceWithEngine(engine)
    expect(sequence([1, 2]))
      .include(1)
      .and.include(2)
    const sign = signWithEngine(engine)
    expect(sign()).equal(-1)
    const weighted = weightWithEngine(engine)
    expect(weighted([1, 2], [1, 1])).equal(1)
  })

  it('should produce a random int in range', () => {
    for (let i = 0; i < 100; i++) {
      expect(intRange(23, 50)).lessThanOrEqual(50).and.greaterThanOrEqual(23)
      expect(intRange(0, 1)).lessThanOrEqual(1).and.greaterThanOrEqual(0)
      expect(intRange(-20, 200))
        .lessThanOrEqual(200)
        .and.greaterThanOrEqual(-20)
      expect(intRange(-100, -10))
        .lessThanOrEqual(-10)
        .and.greaterThanOrEqual(-100)
    }
  })

  it('should produce a random float in range', () => {
    for (let i = 0; i < 100; i++) {
      expect(floatRange(0.1, 0.2))
        .lessThanOrEqual(0.2)
        .and.greaterThanOrEqual(0.1)
      expect(floatRange(10.6, 20.2))
        .lessThanOrEqual(20.2)
        .and.greaterThanOrEqual(10.6)
      expect(floatRange(-20.11, 201.99))
        .lessThanOrEqual(201.99)
        .and.greaterThanOrEqual(-20.11)
      expect(floatRange(-100.01, -10.39))
        .lessThanOrEqual(-10.39)
        .and.greaterThanOrEqual(-100.01)
    }
  })

  it('should produce a normal float', () => {
    for (let i = 0; i < 100; i++) {
      expect(normalFloat()).lessThanOrEqual(1).and.greaterThanOrEqual(-1)
    }
  })

  it('should produce a random number between -1 and 1', () => {
    for (let i = 0; i < 1000; i++) {
      expect(floatRange(-1, 1)).lessThanOrEqual(1).and.greaterThanOrEqual(-1)
    }
  })

  it('should produce a weighted random integer in the range', () => {
    for (let i = 0; i < 100; i++) {
      expect(weighted([1, 2, 3, 4, 5, 6], [1, 2, 3, 2, 1, 1])).to.be.within(
        1,
        6
      )
    }
  })

  it('should throw error when nums !== weights', () => {
    expect(() => weighted([1, 2], [1])).to.throw()
  })

  it('should produce a weighted random float in the range', () => {
    for (let i = 0; i < 100; i++) {
      expect(weighted([1.5, 2.7, 3.2, 4.1, 5.0], [1, 2, 3, 2, 1])).to.be.within(
        1.5,
        5.0
      )
    }
  })

  it('should produce a random number that follows a normal distribution', () => {
    const numSamples = 10000
    const mean = 0
    const stdDev = 1
    const samples: number[] = []

    for (let i = 0; i < numSamples; i++) {
      const randomValue = normalDist(mean, stdDev)
      samples.push(randomValue)
    }

    const sampleMean =
      samples.reduce((sum, value) => sum + value, 0) / numSamples
    const sampleVariance =
      samples.reduce((sum, value) => sum + (value - sampleMean) ** 2, 0) /
      numSamples
    const sampleStdDev = Math.sqrt(sampleVariance)

    expect(sampleMean).closeTo(0, 0.05)
    expect(sampleStdDev).closeTo(1, 0.05)
  })

  it('should produce a seed function that is predictable', () => {
    const func = seedFunc(1233)
    const result: number[] = []

    for (let i = 0; i < 10; i++) {
      result.push(func())
    }

    const newFunc = seedFunc(1233)

    for (let i = 0; i < 10; i++) {
      expect(newFunc()).to.equal(result[i])
    }
  })

  it('should return a random item from a sequence', () => {
    const testArr = [1, 2, 3, 4, 5]
    expect(testArr).to.include(oneOf(testArr))
  })

  it('should produce a random array sequence', () => {
    const testArr = [12, 5, 9, -20, 5]
    const resultArr = sequence(testArr)

    testArr.forEach((item) => {
      expect(resultArr).to.include(item)
    })
  })

  it('should produce a random integer sequence from range', () => {
    const testArr = [1, 2, 3, 4, 5]
    const resultArr = intSequence(1, 5)

    testArr.forEach((item) => {
      expect(resultArr).to.include(item)
    })
  })

  it('should produce a random boolean', () => {
    expect([true, false]).to.include(bool())
  })

  it('should produce a sign (-1 or 1)', () => {
    for (let i = 0; i < 100; i++) {
      expect([-1, 1]).to.include(sign())
    }
  })

  it('should produce a random character in string', () => {
    const testStr = 'hello my name is'
    expect(testStr).to.include(char(testStr))
  })

  it('should produce a unique function that accepts a sequence', () => {
    const testSequence = [10, -20, 3, 750, 's']
    const capture: Array<(typeof testSequence)[number] | null> = []
    const uniqRand = uniqFuncSequence(testSequence)

    for (let i = 0; i < testSequence.length; i++) {
      capture.push(uniqRand())
    }

    expect(uniqRand()).to.be.null

    capture.forEach((item) => {
      expect(testSequence).to.include(item)
    })
  })

  it('should produce a unique function that accepts a range', () => {
    const testSequence = [1, 2, 3, 4, 5]
    const capture: Array<(typeof testSequence)[number] | null> = []
    const uniqRand = uniqFuncIntRange(1, 5)

    for (let i = 0; i < testSequence.length; i++) {
      capture.push(uniqRand())
    }

    expect(uniqRand()).to.be.null

    capture.forEach((item) => {
      expect(testSequence).to.include(item)
    })
  })

  it('should produce a random number that follows an exponential distribution', () => {
    const numSamples = 10000
    const lambda = 0.5
    const expectedMean = 1 / lambda
    const samples: number[] = []

    for (let i = 0; i < numSamples; i++) {
      const randomValue = exponentialDist(lambda)
      samples.push(randomValue)
    }

    const sampleMean =
      samples.reduce((sum, value) => sum + value, 0) / numSamples

    expect(sampleMean).closeTo(expectedMean, 0.05)
  })

  it('should allow users to pass custom distributions', () => {
    const numSamples = 10000
    const lambda = 0.5
    const expectedMean = 1 / lambda
    const samples: number[] = []

    const exponentialDist = (num: number): number => {
      return -Math.log(1 - num) / lambda
    }

    for (let i = 0; i < numSamples; i++) {
      const randomValue = customDist(exponentialDist)
      samples.push(randomValue)
    }

    const sampleMean =
      samples.reduce((sum, value) => sum + value, 0) / numSamples
    expect(sampleMean).closeTo(expectedMean, 0.05)
  })
})
