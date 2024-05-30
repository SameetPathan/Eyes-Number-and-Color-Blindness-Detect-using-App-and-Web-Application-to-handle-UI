import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from "firebase/database";

const colorsList = Array.from({ length: 30 }, (_, index) => (index + 2) * 5);

const NumberTester = () => {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [speech, setSpeech] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [showResponses, setShowResponses] = useState(false);

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
      setShowResponses(true);
      // Save responses to the database or process them as needed
    } catch (error) {
      console.log("Data Error");
    }
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance();
    textToSpeech.rate = 0.8;
    textToSpeech.text = "Can you see this number? Please speak or select Yes or No. Click the Start button to begin the check.";
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

  const handleResponse = (response, indexT) => {
    const updatedResponses = [...responses, { number: colorsList[indexT], response }];
    setResponses(updatedResponses);
    setIndex(indexT);
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

  const manualResponse = (response) => {
    handleResponse(response, index);
    setIndex(index + 1);
    if (index + 1 >= colorsList.length) {
      clearInterval(intervalId);
      setIsStarted(false);
    }
  };

  return (
    <>
      <div className="alert alert-primary" role="alert">
        Eyes Number Check
      </div>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '66vh' }}>
        <div>
          <div className="color-container" style={{ textAlign: 'center' }}>
            {index < colorsList.length && !showResponses ? (
              <>
                <div
                  className="color-box"
                  style={{
                    backgroundColor: `hsl(${colorsList[index]}, 100%, 50%)`,
                    width: '250px',
                    height: '250px',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    fontSize: `${colorsList[index]}px`,
                    marginTop: "200px",
                  }}
                >
                  {colorsList[index]}
                </div>
                <button className="btn btn-primary mt-3" style={{ height: "50px", width: "100px" }} onClick={start} disabled={isStarted}>
                  Start
                </button>
                <div className="button-group mt-3">
                  <button className="btn btn-success ml-2" style={{ height: "50px", width: "100px" }} onClick={() => manualResponse("yes")}>
                    Yes
                  </button>
                  <button className="btn btn-danger ml-2" style={{ height: "50px", width: "100px" }} onClick={() => manualResponse("no")}>
                    No
                  </button>
                </div>
                <div className="button-group mt-5 mb-5" style={{ marginBottom: "200px" }}>
                  <button className="btn btn-success ml-2" style={{ height: "60px", width: "200px" }} onClick={sendResponse}>
                    Complete check and save response
                  </button>
                </div>
                <div  style={{ height: "60px", width: "200px" }}>
                </div>
              </>
            ) : (
              <div>
                <h2>Responses</h2>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Color</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((item, index) => (
                      <tr key={index}>
                        <td>{item.number}</td>
                        <td style={{ backgroundColor: `hsl(${item.number}, 100%, 50%)` }}>&nbsp;</td>
                        <td>{item.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberTester;
