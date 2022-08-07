import { titleCreator } from '../formatters'
import {
  MOON_HOLDINGS,
  LOGIN,
  TITLE_HOME,
  TITLE_SIGNUP,
  TITLE_PRIVACY_POLICY,
  TITLE_TERMS_SERVICE,
} from '../../constants/copy'

describe('formatters util functions', () => {
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
