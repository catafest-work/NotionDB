import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // these will be send to background 
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  function submitFormToNotion() {
    console.log("texting area!");
    fetch("http://localhost:4000/submitFormToNotion", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type":  "application/json"
      },
      body: JSON.stringify({
        name: name, 
        phoneNumber: phoneNumber,
        extraInfo: extraInfo
      })
    }).then(response => response.json())
    .then(data => {
      console.log("Done !", data);
    }).catch((error) => {
      console.log("Error:_^~", error)
    })
  }

  return (  
    <div className="App">
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1> Interested ... </h1>
        <p>Name</p>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
        <p>Phone Number</p>
        <input type="text" id="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} />
        <p>Anything else ?</p>
        <textarea onChange={(e) => setExtraInfo(e.target.value)} rows={10} cols={25} />
        <div>
          <button onClick={submitFormToNotion}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
