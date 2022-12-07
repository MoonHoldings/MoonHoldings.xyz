import {
  MOON_HOLDINGS,
  LOGIN,
  TITLE_HOME,
  TITLE_SIGNUP,
  TITLE_PRIVACY_POLICY,
  TITLE_TERMS_SERVICE,
} from '../constants/copy'

export const titleCreator = name => {
  let title

  switch (name) {
    case 'home':
      title = TITLE_HOME
      break
    case 'login':
      title = `${MOON_HOLDINGS} ${LOGIN}`
      break
    case 'sign-up':
      title = TITLE_SIGNUP
      break
    case 'privacy-policy':
      title = TITLE_PRIVACY_POLICY
      break
    case 'terms-of-service':
      title = TITLE_TERMS_SERVICE
      break
    default:
      return MOON_HOLDINGS
  }

  return title
}

export const truncate = (str, n) => {
  console.log('truncate', str)
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}

export const truncateCollectionName = name => {
  return truncate(name, 24)
}
