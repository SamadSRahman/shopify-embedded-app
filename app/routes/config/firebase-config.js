// import { initializeApp } from "firebase/app";
// import { useRecoilValue } from 'recoil';
// import {
//   apiKeyAtom,
//   authDomainAtom,
//   projectIdAtom,
//   storageBucketAtom,
//   messagingSenderIdAtom,
//   appIdAtom,
//   measurementIdAtom,
// } from '../recoilStore/store';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// export default function FirebaseConfig() {
//   const apiKey = useRecoilValue(apiKeyAtom);
//   const authDomain = useRecoilValue(authDomainAtom);
//   const projectId = useRecoilValue(projectIdAtom);
//   const storageBucket = useRecoilValue(storageBucketAtom);
//   const messagingSenderId = useRecoilValue(messagingSenderIdAtom);
//   const appId = useRecoilValue(appIdAtom);
//   const measurementId = useRecoilValue(measurementIdAtom);

//   const firebaseConfig = {
//     apiKey: apiKey,
//     authDomain: authDomain,
//     projectId: projectId,
//     storageBucket: storageBucket,
//     messagingSenderId: messagingSenderId,
//     appId: appId,
//     measurementId: measurementId,
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   // Your Firebase initialization logic here

//   return null; // This component doesn't render anything, so return null
// }