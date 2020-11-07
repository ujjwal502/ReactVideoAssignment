import React from 'react'
import { AiFillGoogleCircle, AiFillFacebook, AiFillAppstore } from 'react-icons/ai'
// import { Redirect } from 'react-router-dom'
import './Signin.css'


export default function Signin(props) {
    const { username, password, isLoggedin } = props;

    if (isLoggedin) {
        props.history.push("/video");
        console.log(props)
    }
    return (
        <div className="container">
            <div className="form-container">
                <div className="signin-container">
                    <form className="sign-in" onSubmit={props.handleSignin} >
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <p>Email</p>
                            <input name="username" placeholder="Enter your email address" type="text" id="username" value={username} onChange={props.handleChange} />
                        </div>
                        <div className="input-field">
                            <p>Password</p>
                            <input name="password" placeholder="Enter your password" type="password" id="password" onChange={props.handleChange} value={password} />
                        </div>
                        <div>
                            <input type="checkbox" name="Remember me" />
                            <span>Remember me</span>
                        </div>
                        <input type="submit" value="Sign in" className="btn" />
                        <p className="social-text">Or</p>
                        <div className="social-media">
                            <button className="social-icon">
                                <AiFillFacebook />
                            </button>
                            <button className="social-icon">
                                <AiFillGoogleCircle />
                            </button>
                            <button className="social-icon">
                                <AiFillAppstore />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


