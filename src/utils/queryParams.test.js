import { readPositivePage, toBackendPage, toUiPage } from './queryParams.js'

describe('queryParams page helpers', () => {
  it('reads positive pages safely', () => {
    expect(readPositivePage('3')).toBe(3)
    expect(readPositivePage('0')).toBe(1)
    expect(readPositivePage('abc', 2)).toBe(2)
  })

  it('converts one-based UI pages to zero-based backend pages', () => {
    expect(toBackendPage(1)).toBe(0)
    expect(toBackendPage(5)).toBe(4)
    expect(toBackendPage(-1)).toBe(0)
  })

  it('converts zero-based backend pages to one-based UI pages', () => {
    expect(toUiPage(0)).toBe(1)
    expect(toUiPage(4)).toBe(5)
    expect(toUiPage(-1)).toBe(1)
  })
})
