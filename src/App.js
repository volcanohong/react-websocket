import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        console.log('app init...');
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.clear = this.clear.bind(this);
        this.urlChange = this.urlChange.bind(this);
        this.requestChange = this.requestChange.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    ws = null;
    state = {
        url: 'ws://localhost:8081/websocket/private?id=91429948',
        // url: 'wss://chronos.omegasys.eu/websocket/channel/20',
        // url: 'ws://localhost:8081/websocket/channel/40',
        wsOpen: false,
        data: [],
        request: ""
    };

    open() {
        if (this.state.url) {
            console.log('connecting: ' + this.state.url);
            this.ws = new WebSocket(this.state.url);
            this.setState({
                wsOpen: true
            });
        }

        this.ws.onopen = () => {
            console.log('connected');
        };

        this.ws.onmessage = res => {
            console.log(res);
            this.setState({
                data: [...this.state.data, res.data]
            });
        };

        this.ws.onclose = () => {
            console.log('disconnected');
        };
    }

    close() {
        if (this.ws) {
            console.log('closing...');
            this.ws.close();
            this.setState({wsOpen: false});
        }
    };

    clear() {
        this.setState({
            data: []
        })
    }

    urlChange(event) {
        this.setState({
            url: event.target.value
        });
    }

    requestChange(event) {
        this.setState({
            request: event.target.value
        });
    }

    sendRequest() {
        const obj = this.state.request;
        console.log(obj);

        /**
         * E.g.,  {action: "ID", language: "en"}
         */
        if (this.ws) {
            try {
                this.ws.send(JSON.stringify(obj))
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        return (
            <div id="container">
                <div id="content">
                    <fieldset>
                        <legend>URL</legend>
                        <div>
                            <input type="text" id="serverUrl" value={this.state.url} onChange={this.urlChange} width="500px"/>
                            <button onClick={this.open} disabled={this.state.wsOpen}>Open</button>
                            <button onClick={this.close} disabled={!this.state.wsOpen}>Close</button>
                        </div>
                        <div>
                            <label>Status:</label>
                            {this.state.wsOpen && (<span id="connectionStatus">OPEN</span>)}
                            {!this.state.wsOpen && (<span id="connectionStatus">CLOSED</span>)}
                        </div>
                    </fieldset>
                    <fieldset id="requestArea">
                        <legend>Request</legend>
                        <div>
                            <textarea id="sendMessage" disabled={!this.state.wsOpen} value={this.state.request} onChange={this.requestChange}></textarea>
                        </div>
                        <div>
                            <button id="sendButton" disabled={!this.state.wsOpen || this.state.request === ""} onClick={this.sendRequest}>Send</button>
                        </div>
                    </fieldset>
                    <fieldset id="messageArea">
                        <legend>Message Log
                            <button id="clearMessage" onClick={this.clear}>Clear</button>
                        </legend>
                        <div id="messages">
                            {this.state.data.map(function (d, idx) {
                                return (<li key={idx}>{d}</li>)
                            })}
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default App;