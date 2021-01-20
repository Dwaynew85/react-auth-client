import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login"

export class App extends Component {
  constructor() {
    super()
  
    this.state = {
       currentUser: null,
       loginForm: {
         email: "", 
         password: ""
       }
    }
  }

  handleLoginFormChange = event => {
    const { name, value } = event.target
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }

    })
  }

  handleLoginFormSubmit = event => {
    event.preventDefault()
    const userInfo = this.state.loginForm
    const headers = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: userInfo
      })
    }
    fetch("http://localhost:3001/login", headers)
    .then(response => response.json())
    .then(userJSON => {
      if (userJSON.error) {
        alert("invalid credentials")
      } else {
        this.setState({
          currentUser: userJSON
        })
      }
    })
    .catch(console.log)
  }
  


  render() {
    console.log(this.state)
    return (
      <div className="App">
        Welcome User
        <Login
          handleLoginFormChange={this.handleLoginFormChange}
          handleLoginFormSubmit={this.handleLoginFormSubmit}  
          email={this.state.loginForm.email}
          password={this.state.loginForm.password}
        />
      </div>
    )
  }
}

export default App
