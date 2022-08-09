import passwordValidate from '@/utils/passwordValidate'

describe('passwordValidate util function', () => {
  it('returns true if password is valid', () => {
    const res = passwordValidate('Foobar1!')
    expect(res).toBe(true)
  })

  it('returns false if password is invalid', () => {
    const res1 = passwordValidate('Fooba')
    expect(res1).toBe(false)

    const res2 = passwordValidate('Foobar')
    expect(res2).toBe(false)

    const res3 = passwordValidate('Foobar1')
    expect(res3).toBe(false)
  })
})
