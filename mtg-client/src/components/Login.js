import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuthenticationHeader } from '../utils/authenticate'
import {Link, NavLink} from 'react-router-dom'

class Login extends Component {
    constructor () {
        super() 

        this.state = {
            username: '',
            password: '',
        }
    }


    handleTextBoxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginClick = () => {
        axios.post('http://localhost:8080/login',{
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            let token = response.data.token
            localStorage.setItem('jsonwebtoken',token)
            this.props.onAuthenticated(token)
            setAuthenticationHeader(token)
        }).catch(error => console.log(error))
    }

    render() {
        return(
            <div> 
                <input name="username" onChange={this.handleTextBoxChange} placeholder='Username'></input>
                <input name="password" type="password" onChange={this.handleTextBoxChange} placeholder='Password'></input>
                <button onClick={this.handleLoginClick}><NavLink to="/view-all-cards">Login</NavLink></button>
            </div> 
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onAuthenticated: (token) => dispatch({type: 'ON_AUTHENTICATED', token: token})
    }
  }

export default connect(null,mapDispatchToProps)(Login)