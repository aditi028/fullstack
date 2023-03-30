import {useState} from 'react'

const  Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  //send user details to backend
  async function loginUser(event){
    event.preventDefault(); //note
    const response = await fetch('http://localhost:1337/api/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json', //to send data as json
      },
      body: JSON.stringify({
        email,password
      }),
    })
    const data = await response.json() //note
    if(data.user){
      localStorage.setItem('token',data.user)
      alert('Login successful')
      window.location.href = '/dashboard'//redirect on login
    }else{
      alert('Incorrect Username/Password')
      console.log(data);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}> 
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
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
}

export default Login;
