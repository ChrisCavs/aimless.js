const expect = require('chai').expect
const aimless = require('../dist/aimless')

/* eslint-env mocha */

describe('aimless', () => {
  it('should produce a random int in range', () => {
    for (let i = 0; i < 20; i++) {
      expect(aimless.intRange(23, 50)).lessThanOrEqual(50).and.greaterThanOrEqual(23)
      expect(aimless.intRange(0, 1)).lessThanOrEqual(1).and.greaterThanOrEqual(0)
      expect(aimless.intRange(-20, 200)).lessThanOrEqual(200).and.greaterThanOrEqual(-20)
      expect(aimless.intRange(-100, -10)).lessThanOrEqual(-10).and.greaterThanOrEqual(-100)
    }
  })
  it('should produce a random float in range', () => {
    for (let i = 0; i < 20; i++) {
      expect(aimless.floatRange(0.1, 0.2)).lessThanOrEqual(0.2).and.greaterThanOrEqual(0.1)
      expect(aimless.floatRange(10.6, 20.2)).lessThanOrEqual(20.2).and.greaterThanOrEqual(10.6)
      expect(aimless.floatRange(-20.11, 201.99)).lessThanOrEqual(201.99).and.greaterThanOrEqual(-20.11)
      expect(aimless.floatRange(-100.01, -10.39)).lessThanOrEqual(-10.39).and.greaterThanOrEqual(-100.01)
    }
  })
  it('should produce a weighted random integer in the range', () => {
    for (let i = 0; i < 20; i++) {
      expect(aimless.weighted(
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 2, 1]
      )).to.be.within(1, 6)
    }
  })
  it('should produce a weighted random float in the range', () => {
    for (let i = 0; i < 20; i++) {
      expect(aimless.weighted(
        [1.5, 2.7, 3.2, 4.1, 5.0],
        [1, 2, 3, 2, 1]
      )).to.be.within(1.5, 5.0)
    }
  })
  it('should produce a random number that follows a normal distribution', () => {
    const mean = 0
    const stdDev = 1
    const numSamples = 10000
    const samples = []

    for (let i = 0; i < numSamples; i++) {
      const randomValue = aimless.normalDist(mean, stdDev);
      samples.push(randomValue);
    }

    const sampleMean = samples.reduce((sum, value) => sum + value, 0) / numSamples;
    const sampleVariance = samples.reduce((sum, value) => sum + ((value - sampleMean) ** 2), 0) / numSamples;
    const sampleStdDev = Math.sqrt(sampleVariance);

    expect(sampleMean).closeTo(0, .05)
    expect(sampleStdDev).closeTo(1, .05)
  })
  it('should produce a seed function that is predictable', () => {
    const seedFunc = aimless.seededFunc(1233)
    const result = []

    for (let i = 0; i < 10; i++) {
      result.push(seedFunc())
    }

    const newSeedFunc = aimless.seededFunc(1233)

    for (let i = 0; i < 10; i++) {
      expect(newSeedFunc()).to.equal(result[i])
    }
  })
})
