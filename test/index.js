const expect = require('chai').expect
const aimless = require('../dist/aimless')

/* eslint-env mocha */

describe('aimless', () => {
  describe('intRange', () => {
    it('should produce a random int in range', () => {
      expect(aimless.intRange(23, 50)).lessThanOrEqual(50)
      expect(aimless.intRange(23, 50)).greaterThanOrEqual(23)
    })
  })
})
