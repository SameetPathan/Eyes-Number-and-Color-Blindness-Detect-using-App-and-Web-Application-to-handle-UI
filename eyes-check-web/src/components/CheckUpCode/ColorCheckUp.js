import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, set, get } from "firebase/database";

const colorsList = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF',
  '#0000FF', '#8B00FF', '#FF1493', '#FF4500', '#7CFC00',
  '#32CD32', '#20B2AA', '#00CED1', '#8A2BE2', '#6A5ACD',
  '#708090', '#B22222', '#FFD700', '#228B22', '#4169E1',
  '#2E8B57', '#FF6347', '#800080', '#808080'
];

const ColorTester = () => {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [speech, setSpeech] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const getYesNo = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, "/voice_inputs");
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();
      console.log(userData);
      return String(userData);
    } catch (error) {
      return "no";
    }
  };

  const sendResponse = async () => {
    try {
      console.log(responses);
      // Save responses to the database or process them as needed
    } catch (error) {
      console.log("Data Error");
    }
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance();
    textToSpeech.rate = 0.8;
    textToSpeech.text = "Can you see this color? Please Speak or select Yes or No. Click Start button to start check";
    setSpeech(textToSpeech);
  }, []);

  useEffect(() => {
    if (speech) {
      speak();
    }
  }, [speech]);

  const speak = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }
    synth.speak(speech);
  };

  const handleResponse = (response, indexT = index) => {
    const updatedResponses = [...responses, { color: colorsList[indexT], response }];
    setResponses(updatedResponses);
    setIndex(indexT + 1);
    const textToSpeech = new SpeechSynthesisUtterance();
    textToSpeech.rate = 0.8;
    textToSpeech.text = response;
    setSpeech(textToSpeech);
  };

  const start = () => {
    setIsStarted(true);
    let indexT = 0;
    const id = setInterval(async () => {
      if (indexT >= colorsList.length) {
        clearInterval(id);
        setIsStarted(false);
        return;
      }
      const res = await getYesNo();
      handleResponse(res, indexT);
      indexT += 1;
    }, 5000);
    setIntervalId(id);
  };

  return (
    <>
      <div className="alert alert-primary" role="alert">
        Eyes Color Blindness Check
      </div>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '66vh',marginBottom:"100px"}}>
        <div>
          <div className="color-container" style={{ textAlign: 'center' }}>
            {index < colorsList.length ? (
              <>
                <div
                  className="color-box"
                  style={{
                    backgroundColor: colorsList[index],
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '24px',
                    marginLeft: "87px",
                    marginTop:"200px"
                  }}
                >
                  Speak or Select
                </div>
                <button className="btn btn-primary mt-3" style={{ height: "50px", width: "100px" }} onClick={start} disabled={isStarted}>
                  Start
                </button>
                <div className="button-group mt-5">
                  <button className="btn btn-success ml-2" style={{ height: "100px", width: "200px" }} onClick={() => handleResponse('Yes')}>
                    Yes <FontAwesomeIcon icon={faThumbsUp} />
                  </button>
                  <button className="btn btn-danger ml-2" style={{ height: "100px", width: "200px" }} onClick={() => handleResponse('No')}>
                    No <FontAwesomeIcon icon={faThumbsDown} />
                  </button>
                </div>
                <div className="button-group mt-5 mb-5">
                  <button className="btn btn-success ml-2" style={{ height: "60px", width: "200px" }} onClick={sendResponse}>
                    Complete check and save response
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h2>Responses</h2>
                <ul>
                  {responses.map((item, index) => (
                    <li key={index}>
                      Color: <span style={{ color: item.color }}>{item.color}</span> - Response: {item.response}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorTester;
