import React, { Component } from 'react';
import axios from 'axios'


class Admin extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            question: '',
            users: []
        }
    }
    componentDidMount(){
        axios.get('/api/question').then(res=>{
            console.log(res);
            if(!res.data.question) {
                this.setState({question: 'Nothing  yet!',  users: res.data.users})
            } else {
                this.setState({question: res.data.question,  users: res.data.users})
            }
        })
        setInterval(()=>{
            axios.get('/api/question').then(res=>{
                console.log(res);
                if(!res.data.question) {
                    this.setState({question: 'Nothing  yet!',  users: res.data.users})
                } else {
                    this.setState({question: res.data.question,  users: res.data.users})
                }
            })
        }, 10000)
    }

    resetQuestion = ()=>{
        console.log('reset');
        axios.post('api/question',{question: ''}).then(res=>{
            this.setState({question: 'Nothing yet!', users: res.data.users})
        })
    }
    submitQuestion = (e) => {
        
        e.preventDefault()
        console.log('Submit');
        axios.post('api/question',{question: this.state.input}).then(res=>{
            this.setState({question: res.data.question, users: res.data.users, input: ''})
        })
    }

    render() {
        var done = []
        var trouble = []
        var inProgress = []
        for (let i = 0; i < this.state.users.length; i++) {
            const element = this.state.users[i];
            if(element.done) {
                done.push(element)
            } else if (element.trouble) {
                trouble.push(element)
            } else {
                inProgress.push(element)
            }
        }
        return (
            <div className='admin-page'>
            <form onSubmit={this.submitQuestion}>

                <input className='admin-input' value={this.state.input} onChange={e=>this.setState({input: e.target.value})} />
                <br />
                <div className="admin-buttons">
                    <button type='submit' className="button" >Submit Question</button>
                    <button className="button" onClick={(e)=>{e.preventDefault(); this.resetQuestion()}}>Reset Question</button>
                </div>
            </form>

                <h1>{this.state.question}</h1>
                <div className='user-columns'>
                    <div>
                        <h2>Done</h2>
                    {done.map(e=>(
                        <div key={e.id}>
                            <p>{e.name}</p>
                        </div>
                    ))}
                    </div>
                    <div>
                    <h2>Having Trouble</h2>
                    {trouble.map(e=>(
                        <div key={e.id}>
                            <p>{e.name}</p>
                        </div>
                    ))}
                    </div>
                    <div>
                    <h2>In progress</h2>
                    {inProgress.map(e=>(
                        <div key={e.id}>
                            <p>{e.name}</p>
                        </div>
                    ))}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Admin;