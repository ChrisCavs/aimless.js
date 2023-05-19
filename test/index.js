const expect = require('chai').expect
const Aimless = require('../dist/aimless')

/* eslint-env mocha */

let rand = null

describe('aimless', () => {
  beforeEach(() => {
    rand = new Aimless()
  })
  it('should accept an engine as class argument', () => {
    const newRand = new Aimless(() => 0.1)
    expect(newRand.call()).equal(0.1)
  })
  it('should produce a random number between 0 and 1', () => {
    for (let i = 0; i < 100; i++) {
      expect(rand.call()).lessThanOrEqual(1).greaterThanOrEqual(0)
    }
  })
  it('should produce a random int in range', () => {
    for (let i = 0; i < 100; i++) {
      expect(rand.intRange(23, 50)).lessThanOrEqual(50).and.greaterThanOrEqual(23)
      expect(rand.intRange(0, 1)).lessThanOrEqual(1).and.greaterThanOrEqual(0)
      expect(rand.intRange(-20, 200)).lessThanOrEqual(200).and.greaterThanOrEqual(-20)
      expect(rand.intRange(-100, -10)).lessThanOrEqual(-10).and.greaterThanOrEqual(-100)
    }
  })
  it('should produce a random float in range', () => {
    for (let i = 0; i < 100; i++) {
      expect(rand.floatRange(0.1, 0.2)).lessThanOrEqual(0.2).and.greaterThanOrEqual(0.1)
      expect(rand.floatRange(10.6, 20.2)).lessThanOrEqual(20.2).and.greaterThanOrEqual(10.6)
      expect(rand.floatRange(-20.11, 201.99)).lessThanOrEqual(201.99).and.greaterThanOrEqual(-20.11)
      expect(rand.floatRange(-100.01, -10.39)).lessThanOrEqual(-10.39).and.greaterThanOrEqual(-100.01)
    }
  })
  it('should produce a random number between -1 and 1', () => {
    for (let i = 0; i < 1000; i++) {
      expect(rand.normal()).lessThanOrEqual(1).and.greaterThanOrEqual(-1)
    }
  })
  it('should produce a weighted random integer in the range', () => {
    for (let i = 0; i < 100; i++) {
      expect(rand.weighted(
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 2, 1, 1]
      )).to.be.within(1, 6)
    }
  })
  it('should throw error when nums !== weights', () => {
    expect(() => rand.weighted([1, 2], [1])).to.throw()
  })
  it('should produce a weighted random float in the range', () => {
    for (let i = 0; i < 100; i++) {
      expect(rand.weighted(
        [1.5, 2.7, 3.2, 4.1, 5.0],
        [1, 2, 3, 2, 1]
      )).to.be.within(1.5, 5.0)
    }
  })
  it('should produce a random number that follows a normal distribution', () => {
    const numSamples = 100000
    const mean = 0
    const stdDev = 1
    const samples = []

    for (let i = 0; i < numSamples; i++) {
      const randomValue = rand.normalDist(mean, stdDev)
      samples.push(randomValue)
    }

    const sampleMean = samples.reduce((sum, value) => sum + value, 0) / numSamples
    const sampleVariance = samples.reduce((sum, value) => sum + ((value - sampleMean) ** 2), 0) / numSamples
    const sampleStdDev = Math.sqrt(sampleVariance)

    expect(sampleMean).closeTo(0, .015)
    expect(sampleStdDev).closeTo(1, .015)
  })
  it('should produce a seed function that is predictable', () => {
    const seedFunc = Aimless.seedFunc(1233)
    const result = []

    for (let i = 0; i < 10; i++) {
      result.push(seedFunc())
    }

    const newSeedFunc = Aimless.seedFunc(1233)

    for (let i = 0; i < 10; i++) {
      expect(newSeedFunc()).to.equal(result[i])
    }
  })
  it('should return a random item from a sequence', () => {
    const testArr = [1,2,3,4,5]
    expect(testArr).to.include(rand.oneOf(testArr))
  })
  it('should produce a random array sequence', () => {
    const testArr = [12,5,9,-20,5]
    const resultArr = rand.sequence(testArr)

    testArr.forEach((item) => {
      expect(resultArr).to.include(item)
    })
  })
  it('should produce a random integer sequence from range', () => {
    const testArr = [1,2,3,4,5]
    const resultArr = rand.intSequence(1,5)

    testArr.forEach((item) => {
      expect(resultArr).to.include(item)
    })
  })
  it('should produce a random boolean', () => {
    expect([true, false]).to.include(rand.bool())
  })
  it('should produce a sign (-1 or 1)', () => {
    for (let i = 0; i < 100; i++) {
      expect([-1, 1]).to.include(rand.sign())
    }
  })
  it('should produce a random character in string', () => {
    const testStr = 'hello my name is'
    expect(testStr).to.include(rand.char(testStr))
  })
  it('should produce a unique function that accepts a sequence', () => {
    const testSequence = [10,-20,3,750,'s']
    const capture = []
    const uniqRand = Aimless.uniqFuncSequence(testSequence)

    for (let i = 0; i < testSequence.length; i++) {
      capture.push(uniqRand())
    }

    expect(uniqRand()).to.be.null

    capture.forEach((item) => {
      expect(testSequence).to.include(item)
    })
  })
  it('should produce a unique function that accepts a range', () => {
    const testSequence = [1,2,3,4,5]
    const capture = []
    const uniqRand = Aimless.uniqFuncIntRange(1,5)

    for (let i = 0; i < testSequence.length; i++) {
      capture.push(uniqRand())
    }

    expect(uniqRand()).to.be.null

    capture.forEach((item) => {
      expect(testSequence).to.include(item)
    })
  })
  it('should produce a random number that follows an exponential distribution', () => {
    const numSamples = 100000
    const lambda = 0.5
    const expectedMean = 1 / lambda
    const samples = []

    for (let i = 0; i < numSamples; i++) {
      const randomValue = rand.exponentialDist(lambda)
      samples.push(randomValue)
    }

    const sampleMean = samples.reduce((sum, value) => sum + value, 0) / numSamples

    expect(sampleMean).closeTo(expectedMean, .01)
  })
  it('should allow users to pass custom distributions', () => {
    const numSamples = 100000
    const lambda = 0.5
    const expectedMean = 1 / lambda
    const samples = []
    const exponentialDist = (num) => {
      return -Math.log(1 - num) / lambda
    }

    for (let i = 0; i < numSamples; i++) {
      const randomValue = rand.customDist(exponentialDist)
      samples.push(randomValue)
    }

    const sampleMean = samples.reduce((sum, value) => sum + value, 0) / numSamples
    expect(sampleMean).closeTo(expectedMean, .01)
  })
})
