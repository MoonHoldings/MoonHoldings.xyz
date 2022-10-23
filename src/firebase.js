import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const Users = collection(db, 'users')
const Coins = collection(db, 'coins')
const Usernames = collection(db, 'usernames')
const BetaTesters = collection(db, 'betaTesters')
const InvestorNetwork = collection(db, 'investorNetwork')
const TestNetwork = collection(db, 'testNetwork')

export {
  db,
  Users,
  Coins,
  Usernames,
  BetaTesters,
  InvestorNetwork,
  TestNetwork,
}
