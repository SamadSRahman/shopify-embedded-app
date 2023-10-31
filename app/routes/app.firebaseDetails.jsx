//firebaseDetails.jsx
import { Page, Text } from '@shopify/polaris'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from '@mui/material/OutlinedInput';
import fbDetailsStyles from './stylesheets/fbDetails.css'
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app'
import Button from '@mui/material/Button'
import { useRecoilState } from 'recoil';
import { firebaseConfigAtom, isUserAuthorizedAtom } from './recoilStore/store';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from '@remix-run/react';
import axios from 'axios';
export const links = () => [{ rel: "stylesheet", href: fbDetailsStyles }];

export default function FirebaseDetais() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const [firebaseConfig, setFirebaseConfig] = useRecoilState(firebaseConfigAtom)
  const [isUserAuthorized, setIsUserAuthorized] = useRecoilState(isUserAuthorizedAtom)
  const newFirebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  }
  const firebaseConfigArr = Object.keys(firebaseConfig)
  const [user, setUser] = useState({})
  const [displayName, setDisplayName] = useState('')
  const [page, setPage] = useState(1)

  const handleLogin = async () => {
    initializeApp(firebaseConfig)
    const authenticate = getAuth();
    const provider = new GoogleAuthProvider()
    signInWithPopup(authenticate, provider)
      .then((result) => {
        console.log(result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token)
        // The signed-in user info.
        const user = result.user;
        // @ts-ignore
        setDisplayName(user.displayName)
        setUser(user)
        console.log(user)
        setPage(2)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
      })
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) { // Check if e.target and e.target.result are not null
          try {
            const parsedData = JSON.parse(e.target.result.toString()); // Convert to string before parsing
            setCredentials(parsedData);
            console.log(parsedData)
            console.log(credentials);
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        }
      };
      reader.readAsText(file);
    }
  }
  const sendcredentialsToBackend = () => {
    if (credentials) {
      console.log(credentials)
      axios.post('https://various-hypnotic-possum.glitch.me/api/firebase-credentials', { credentials: credentials })
        .then((response) => {
          console.log('JSON data sent successfully:', response.data);
          navigate('/app/segments')
          // Perform any additional actions after a successful response
        })
        .catch((error) => {
          console.error('Error sending JSON data to the backend:', error);
        });
    }
  };
  const [serverKey, setServerKey] = useState('')
  const handleServerKeyChange = (e) => {
    setServerKey(e.target.value)
  }
  const handleNext = () => {
    if (serverKey.length != 152) {
      alert("Please enter a valid Server Key")
    }
    else {
      navigate('/app/segments')
    }
  }
  const handleSignOut = ()=>{
    getAuth().signOut().then(() => {
      //setPage(1)
      alert("SignOut Successful")
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <Page><div className='main'> 
      {page === 1 && <div className='form'>
        <Text as='h3' variant="heading2xl" id='heading'>Enter your Firebase Projects Configuration</Text>
        {firebaseConfigArr.map((ele) => {
          let fieldName = ele;
          return (
            <FormControl key={fieldName} sx={{ m: 1, width: "30ch" }} variant="outlined">
              <InputLabel size="small">{fieldName}</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-email"
                type="text"
                onChange={(e) => setFirebaseConfig({ ...firebaseConfig, [fieldName]: e.target.value })}
                value={firebaseConfig[fieldName]}
                label={fieldName}
              />
            
            </FormControl>
          )
        })
      }      <Button onClick={handleLogin}>Sign in with Google</Button></div>}
      {/* <OutlinedInput type='file' onChange={handleFileUpload}/> */}
     {page===2 && <div className='form'>
      <Text as='h2'variant="headingMd" id='heading'>Welcome, {displayName}!</Text>
     <OutlinedInput size='small' type='text' onChange={handleServerKeyChange} value={serverKey}
        placeholder='Enter your Server Key'
      />
      <Button
        onClick={handleNext}
        variant='contained' id='doneBtn'>
        Next
      </Button>
      <Button variant='contained' onClick={handleSignOut}>Sign Out</Button>
     </div>}
    </div>
    </Page>
  )}
