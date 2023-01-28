import React from 'react';
import { useEffect,useState } from 'react';
import './App.css';

function App() {

  const [data, setdata] = useState({
  name: "",
  age: 0,
  date: "",
  programming: "",
  data:""
});

// Using useEffect for single rendering
useEffect(() => {
  // Using fetch to fetch the api from 
  // flask server it will be redirected to proxy
  fetch("/data").then((res) =>
      res.json().then((data) => {
        console.log(data)  
        
        // Setting a data from api
          setdata({
              name: data.Name,
              age: data.Age,
              date: data.Date,
              programming: data.programming,
              data: data.data
          });
      })
  );
}, []);

return (
  <div className="App">
      <header className="App-header">
          <h1>React and flask</h1>
          {/* Calling a data from setdata for showing */}
          <p>Let's ask ChatGPT what is React?</p>
          <p>Answer</p>
          <p>{data.data}</p>

      </header>
  </div>
);
}

export default App;
