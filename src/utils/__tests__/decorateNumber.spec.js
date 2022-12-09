import decorateNumber from '@/utils/decorateNumber'

describe('decorateNumber', () => {
  it('returns expected 1,000', () => {
    const res = decorateNumber(1000)
    expect(res).toBe('1,000')
  })

  it('returns expected 1,000,000', () => {
    const res = decorateNumber(1000000)
    expect(res).toBe('1,000,000')
  })

  it('returns expected 0.42069', () => {
    const res = decorateNumber(0.42069)
    expect(res).toBe('0.42069')
  })

  it('returns expected 16,818.02', () => {
    const res = decorateNumber(16818.02170388)
    expect(res).toBe('16,818.02')
  })
  
  it('returns expected 0', () => {
    const res = decorateNumber(0.001)
    expect(res).toBe('0.001')
  })
})