import React, { Component } from 'react';
import axios from 'axios'
import checkmark from './checkmark-button.png'
import elipses from './elipses-button.png'
import cross from './cross-button.png'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            question: 'Nothing  yet!'
        }
    }

    componentDidMount(){
        axios.get('/api/user').then(res=>{
            this.setState({user: res.data})
        }).catch(err => {
            this.props.history.push('/login')
        })
        axios.get('/api/question').then(res=>{
            console.log(res);
            if(!res.data.question) {
                this.setState({question: 'Nothing  yet!'})
            } else {
                this.setState({question: res.data.question, user: res.data.user})
            }
        })
        setInterval(()=>{
            axios.get('/api/question').then(res=>{
                if(!res.data.question) {
                    this.setState({question: 'Nothing  yet!'})
                } else {
                    this.setState({question: res.data.question, user: res.data.user})
                }
            })
        }, 10000)
    }

    indicateDone = () => {

        this.setState({
            user: {...this.state.user, done: true, trouble: false}
        })
        axios.get('/api/status/done').then(res=>{
            this.setState({
                user: res.data
            })
        })
    }
    indicateInProgress = () => {
        this.setState({
            user: {...this.state.user, done: false, trouble: false}
        })
        axios.get('/api/status/progress').then(res=>{
            this.setState({
                user: res.data
            })
        })
    }
    indicateTrouble = () => {
        this.setState({
            user: {...this.state.user, done: false, trouble: true}
        })
        axios.get('/api/status/trouble').then(res=>{
            this.setState({
                user: res.data
            })
        })
    }

    render() {
        const {user} = this.state
        return (
            <div className='home-background'>
                <h3>Hello, {user.name}</h3>
                <h1 className='home-header'>{this.state.question}</h1>
                <div className='status-button-row'>
                    <div>

                        <div onClick={this.indicateTrouble} className={`status-button trouble ${user.trouble ? 'active' : ''}`}><img src={cross}/></div>
                    </div>
                    <div>

                        <div onClick={this.indicateInProgress} className={`status-button progress ${!user.trouble && !user.done ? 'active' : ''}`}><img src={elipses} /></div>
                    </div>
                    <div>

                        <div onClick={this.indicateDone} className={`status-button done ${user.done ? 'active' : ''}`}><img src={checkmark} /></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;