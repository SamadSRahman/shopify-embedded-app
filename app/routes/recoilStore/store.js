import {atom} from 'recoil'

export const firebaseConfigAtom = atom({
  key:'firebaseConfigAtom',
  default:{ apiKey: "AIzaSyBEN_dt-4xES89VP482LYq_dAqKwhJfPgo",
  authDomain: "testing-firebase-df51e.firebaseapp.com",
  databaseURL: "https://testing-firebase-df51e-default-rtdb.firebaseio.com",
  projectId: "testing-firebase-df51e",
  storageBucket: "testing-firebase-df51e.appspot.com",
  messagingSenderId: "746977002524",
  appId: "1:746977002524:web:9e3b40ac0c5544dbf38bd9",}
})
export const isUserAuthorizedAtom = atom({
  key :'isUserAuthorizedAtom',
  default: false
})

