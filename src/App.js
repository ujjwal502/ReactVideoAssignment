import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Signin from './components/Auth/Signin'
import Video from './components/Video/Video'


class App extends Component {
  state = {
    username: "",
    password: "",
    isLoggedIn: false
  };

  handleSignin = (e) => {
    e.preventDefault()
    const { username, password } = this.state;

    if (username === "admin" && password === "admin") {
      this.setState({
        isLoggedIn: true
      })
    } else {
      console.error("Email and password needs to be valid")
    }
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { username, password, isLoggedIn } = this.state
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route isLoggedIn={isLoggedIn} path="/video" component={Video}></Route>
            <Route path="/" render={(props) => {
              return (
                <Signin
                  handleSignin={this.handleSignin}
                  handleChange={this.handleChange}
                  username={username}
                  password={password}
                  isLoggedIn={isLoggedIn}
                  {...props}
                />
              )
            }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

}

export default App;
