import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div id="container">
      <div id="content">
        <fieldset>
          <legend>URL</legend>
          <div>
              <input type="text" id="serverUrl" value="ws://example.com/websocket" width="500px" />
              <button id="connectButton">Open</button>
              <button id="disconnectButton">Close</button>
          </div>
          <div>
              <label>Status:</label>
              <span id="connectionStatus">CLOSED</span>
          </div>
        </fieldset>
        <fieldset id="requestArea">
          <legend>Request</legend>
          <div>
              <textarea id="sendMessage" disabled="disabled"></textarea>
          </div>
          <div>
              <button id="sendButton" disabled="disabled">Send</button>
              [Ctrl + Enter]
          </div>
        </fieldset>
        <fieldset id="messageArea">
          <legend>Message Log
              <button id="clearMessage">Clear</button>
          </legend>
          <div id="messages"></div>
        </fieldset>
      </div>
    </div>
  );
}

export default App;
