import axios from "axios";
// import { useState, useEffect } from "react";
import React, { useState } from "react";
// import { Link } from "react-router-dom"


const Login = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const signIn = (e) => {
    e.preventDefault();

    if (username !== '' && password !== '') {
        const req = {
            username,
            password
        };

        axios.post('http://localhost:5000/users/login', req).then(result => {
            const token = result.data;
            localStorage.setItem("mytoken",JSON.stringify(token));
            console.log(result)
        });
    }
};

// useEffect(() => {
//     // storing input name
//     localStorage.setItem("mytoken", JSON.stringify(token));
//   }, [token]);


return (<div>
    <form onSubmit={ signIn }>
        <h1>Sign In</h1>
        <label>Username</label>
        <input type='text' name='username' onChange={(e) => setUsername(e.target.value) }/>
        <label>Password</label>
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value) }/>
       {/* <Link to="/profile" > */}
        <button>Sign in</button>
        {/* </Link>   This is close to what I want but it breaks.  */ }
        
    </form>

</div>);

}


export default Login;



// export default class Login extends React.Component {
//   state = {
//    username: "",
//     password: ""
//   };

//   handleUsername = (event) => {
//     this.setState({ username: event.target.value });
//   };

//   handlePassword = (event) => {
//     this.setState({ password: event.target.value });
//   };


//   handleSubmit = (event) => {    
//     event.preventDefault();

//     const user = {
//       username: this.state.username,
//       password: this.state.password
  
//     };

//     axios
//     .post(`http://localhost:5000/api/users/login`, { user }) //this is where the address to the backend will go
//     .then((res) => {
//       console.log(res);
//       console.log(res.data);
//     });
// this.setState({ username: '', password: '' })
// };

// render() {
//   return (
//     <>
//       <div>
//      <h1>Sign In</h1>

//      <form onSubmit={this.handleSubmit} >
//        <div>
//          <label>
//            Username:
//            <input
//           //  id="name"
//            type="text"
//            name="username"
//            value={this.state.username}   
//            className="form-input"
//            placeholder="Enter Name"
//            onChange={this.handleUsername}
//            />
//          </label>
//        </div>
//        <div>
//          <label>
//            Password:
//            <input
//           //  id="password"
//            type="password"
//            name="password"
//            value={this.state.password} 
//            className="form-input"
//            placeholder="Enter Password"
//            onChange={this.handlePassword}
//            />
//          </label>
//          <button type="submit" value="Login" >Sign In</button>
//        </div>
//      </form>
//       </div>
    
    
//     </>
//   );
// }}


//Check the set and the handle changess. 