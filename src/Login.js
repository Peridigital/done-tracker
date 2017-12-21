import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            input: ''
        }
    }

    login = (e) => {
        e.preventDefault()
        console.log(this.state);
        axios.post('/api/login', {name: this.state.input}).then(res=>{
            this.props.history.push('/')
        })
    }
  

    render() {
        return (
            <div className='login-page'>
                <div>
                    <h1 className='login-header'>Please enter your real name</h1>
                    <form onSubmit={this.login}>

                        <input className='input' onChange={e=>this.setState({input: e.target.value})} />
                        <br />
                        <button className='button' >Login</button>
                    </form>
                    
                </div>

            </div>
        );
    }
}

export default Login;