import React from 'react';
import { useEffect,useState } from 'react';
import './App.css';
import Bar from './components/Bar';
import Chat from './components/chat/chat';
import { ChatMessageDto } from './model/ChatMessageDto';

function App() {
  





return (
  <div className="App">
    <Bar/>
    <Chat/>   
  </div>
);
}

export default App;
