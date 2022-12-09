import {
  titleCreator,
  truncate,
  truncateCollectionName
} from '../formatters'
import {
  MOON_HOLDINGS,
  LOGIN,
  TITLE_HOME,
  TITLE_SIGNUP,
  TITLE_PRIVACY_POLICY,
  TITLE_TERMS_SERVICE,
} from '../../constants/copy'

describe('formatters titleCreator functions', () => {
  it('returns Moon Holdings by default', () => {
    const res = titleCreator('')
    expect(res).toBe(MOON_HOLDINGS)
  })

  it('returns Moon Holdings | Your Crypto Portfolio Tracker', () => {
    const res = titleCreator('home')
    expect(res).toBe(TITLE_HOME)
  })

  it('returns Moon Holdings Login', () => {
    const res = titleCreator('login')
    expect(res).toBe(`${MOON_HOLDINGS} ${LOGIN}`)
  })

  it('returns Moon Holdings Sign Up', () => {
    const res = titleCreator('sign-up')
    expect(res).toBe(TITLE_SIGNUP)
  })

  it('returns Moon Holdings | Privacy Policy', () => {
    const res = titleCreator('privacy-policy')
    expect(res).toBe(TITLE_PRIVACY_POLICY)
  })

  it('returns Moon Holdings | Terms Of Service', () => {
    const res = titleCreator('terms-of-service')
    expect(res).toBe(TITLE_TERMS_SERVICE)
  })
})

describe('formatters truncate functions', () => {
  it('truncate returns formatted string', () => {
    const test1 = truncate('123456789012345678901234', 21)
    const test2 = truncate('123456789012345678901234', 4)
    const expected1 = ('12345678901234567890...')
    const expected2 = ('123...')
    expect(test1).toBe(expected1)
    expect(test2).toBe(expected2)
  })

  it('truncateCollectionName returns truncated string from original length of 24', () => {
    const test1 = truncateCollectionName('The big long name collection')
    const test2 = truncateCollectionName('Short Name')
    const expected1 = ('The big long name colle...')
    const expected2 = ('Short Name')
    expect(test1).toBe(expected1)
    expect(test2).toBe(expected2)
  })
})
