import { Page } from "@shopify/polaris";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import segmentStyles from "./stylesheets/segment.css";
import { AiOutlineSend } from "react-icons/ai";
import Button from "@mui/material/Button";
import { SiFirebase } from "react-icons/si";
import { useNavigate, Outlet } from "@remix-run/react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { isUserAuthorizedAtom } from "./recoilStore/store";
import { useRecoilValue } from "recoil";


export const links = () => [{ rel: "stylesheet", href: segmentStyles }];

export default function Segments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [segments, setSegments] = useState(['segment1', 'segment2', 'segment3']);
  const isUserAuthorized = useRecoilValue(isUserAuthorizedAtom);
  const handleSelect = (event, newValue) => {
    setSelectedSegments(newValue);
  };
  useEffect(() => {
    // if(isUserAuthorized===false){
    //   navigate('/app/firebaseDetails')
    // }
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  }, [isAlertVisible]);
  function getData() {
    const apiUrl = "https://entertaining-wheat-loganberry.glitch.me/getAllSegment";
    axios
      .get(apiUrl)
      .then((response) => {
        const dataFromApi = response.data.segments;
        setData(dataFromApi);
        setSegments(dataFromApi.map((ele) => ele.name));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const handleSend = async () => {
    if (selectedSegments.length < 1) {
      setErrorMessage("Please select atleast one segment to continue");
      setIsAlertVisible(true);
      console.log("alert visible");
    } else if (title.length < 1) {
      setErrorMessage("Please enter a title for the notification");
      setIsAlertVisible(true);
    } else if (message.length < 1) {
      setErrorMessage("Please enter a message for the notification");
      setIsAlertVisible(true);
    } else {
      const filteredData = data
        // @ts-ignore
        .filter((item) => selectedSegments.includes(item.name))
        .map(({ name, id }) => ({ name, id }));
      try {
        // Get the current registration token
        const notificationMessage = {
          title: title,
          body: message,
          segments: filteredData,
        };
        axios
          .post(
            "https://various-hypnotic-possum.glitch.me/sendNotification",
            notificationMessage
          )
          .then((response) => {
            console.log(
              "Notification sent sucessfully:",
              notificationMessage,
              response.data
            );
            // Perform any additional actions after a successful response
          })
          .catch((error) => {
            console.error("Error sending notification:", error);
          });
      } catch (error) {
        console.error(
          `Error sending notification to topic "${selectedSegments}":`,
          error
        );
      }
    }
  };
  return (
    <Page>
      {/* <ui-title-bar title="Select Segments" /> */}
      {/* <Button variant="contained" endIcon={<SiFirebase />} id="fbLoginBtn">
        Login to Firebase
      </Button> */}
      <div className="App">
        <div className="container">
          <div className="sectionDiv" style={{ display: "flex" }}>
            <span className="toTag">To:</span>
            <Autocomplete
              onChange={handleSelect}
              options={segments}
              getOptionLabel={(option) => option}
              multiple
              style={{backgroundColor:'red', width: "80%", marginLeft: "2rem", marginTop: "1rem" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder={
                    selectedSegments.length > 0 ? "" : "Select Segments"
                  }/>
              )}/>
          </div>
          <div className="sectionDiv ">
            <span className="titleTag">Title:</span>
            <input
              placeholder="Add a short and descriptive title"
              type="text"
              className="titleField"
              onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div
            className="sectionDiv"
            style={{ display: "flex", alignItems: "center" }}>
            <span className="bodyTag">Body:</span>
            <textarea
              rows={9}
              cols={65}
              className="bodyTextarea"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <Button
          id="backBtn"
          variant="contained"
          onClick={() => navigate("/app/firebaseDetails")}>
          Back
        </Button>
        <Button
          id="sendBtn"
          variant="contained"
          endIcon={<AiOutlineSend />}
          onClick={handleSend}>
          Send
        </Button>
      </div>
      {isAlertVisible && (
        <Alert id="alert" variant="filled" severity="error">
          {errorMessage}
        </Alert>
      )}
    </Page>
  );
}
