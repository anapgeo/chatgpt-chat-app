import React from 'react';
import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [question,setquestion]=useState("")
  const [data, setdata] = useState({
  name: "",
  age: 0,
  date: "",
  programming: "",
  data:""
});


const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("The question was:",{question})
  
 await fetch('http://localhost:5000/post',{
    method:'POST',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(question)
  }).then(()=>{
    console.log("New question send")
  })
  
 await fetch("/data").then((res) =>
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
  ).then(()=>console.log("GET"))

}


// Using useEffect for single rendering


return (
  <div className="App">
      <header className="App-header">
          <h1>React and flask</h1>
          {/* Calling a data from setdata for showing */}
          <p>Let's ask ChatGPT what is React?</p>
          <form onSubmit={handleSubmit}>
            <label>Question</label>
            <input  name={question} onChange={(e) => setquestion(e.target.value)} />
          </form>
          <p>Answer</p>
          <p>{data.data}</p>

      </header>
  </div>
);
}

export default App;
