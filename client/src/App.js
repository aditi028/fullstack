import './App.css';
import {useState} from 'react'

function App() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  //send user details to backend
  async function registerUser(event){
    event.preventDefault(); //note
    const response = await fetch('http://localhost:1337/api/register',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json', //to send data as json
      },
      body: JSON.stringify({
        name,email,password
      }),
    })
    const data = await response.json() //note
    console.log(data);
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e)=>setName(e.target.value)} 
          type="text" 
          placeholder="Name"/>
        <br/>  
        <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
          type="email" 
          placeholder="Email"/>
        <br/>
        <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)} 
          type="password" 
          placeholder="Password"/>
        <br/>
        <input type="submit" value="Register"></input>
      </form>
    </div>
  );
}

export default App;
