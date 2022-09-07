import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCIx2G6E_-Xkg-6qmpgFwRtc6cTH9WJhK8',
  authDomain: 'moonholdings-d3dd9.firebaseapp.com',
  projectId: 'moonholdings-d3dd9',
  storageBucket: 'moonholdings-d3dd9.appspot.com',
  messagingSenderId: '801831571722',
  appId: '1:801831571722:web:6bedd3db6a1877d504eaf3',
  measurementId: 'G-ZT04M90N1E',
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
