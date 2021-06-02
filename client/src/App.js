import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import './App.css';
import Chat from './Components/Chat';
import ChatHome from './Components/ChatHome';
import { SocketContext } from './Context/SocketContext';
const ENDPOINT = 'http://localhost:3001'
const socket = socketIOClient(ENDPOINT)

function App() {
  return (
    <>
    <SocketContext.Provider value = {socket}>
    <Router>
      <Switch>
        <Route path = "/" exact component = {ChatHome}></Route>
        <Route path = "/chat" exact component = {Chat}></Route>
      </Switch>
    </Router>
    </SocketContext.Provider>
    
    </>

  );
}

export default App;
