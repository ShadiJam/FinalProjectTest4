// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { get, post, log, Error, Layout, reactapp } from './app'
import Forms from './forms'
import { update, rootComponent, prop } from './forms'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, EventLocation, EmployeeTable} from './components'
import * as models from './models'

// export class DateRender extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//         items: []
//         }
//     }
//     change(){
//     	if(item !== dateTime) return
        
//         let item = 
//         this.setState((dateTime.getMonth()+1) + '/' + 
//                   dateTime.getDate() + '/' +  
//                   dateTime.getFullYear())
//         }
//     render(){
//         return <div>{item}</div>
//     }
// }

export class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            IdentityUser: null
        }
    }
     submit(e) {
        e.preventDefault()
        post('/account/login', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/api/employee/${x.$id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err 
        return <form className="login-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Login:</p> : null}
            {err}
            <span></span>
            <h4>Login</h4>   
            <div className="input-fields">
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <button className="login-button" type="submit">KEY</button>
            </div>
        </form>
    }
}

export class RegisterForm extends Component {
    constructor(props){
        super(props)
         this.state = {
             IdentityUser: null
            }
        }
    submit(e) {
        e.preventDefault()
        post('/account/register', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/api/employee/${x.$id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
        }
    render(){
        var err
        return <form className="register-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Registration:</p> : null}
            {err}

            <h4>Register</h4>   
            <div className="input-fields">
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input  ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <button className="register-button" type="submit">KEY</button>
            </div>
        </form>
    }
}

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        var err 
        if(this.state.errors){
            err = <ul className="login-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        } 
        return (
            <div className="login-stuff">
                <div className="description">
                <ul>
                    <li className="description"><h5>A dynamic web based software system uniting business management with the internal advance process for large and small scale event production.</h5></li>
                    <li className="description"><h5>Collect event information with customized form building, all in one place.</h5></li> 
                    <li className="description"><h5>Communicate critical event information to your team and track progress in real time against tight deadlines.</h5></li>
                </ul>
                </div>
                <div className="login-input-stuff">
                <LoginForm />
                <RegisterForm />
                </div>
                
            </div>
        )
    }
}

export class EmployeeView extends Component {
    constructor(props){
        super(props)
        this.state =  { 
            $id: props.params.id,
            items: []
         } 
    }
    componentDidMount(){
        let {$id} = this.state
        if($id !== null){
        get('/api/advent').then(advents => {
                advents = advents.reverse()
                this.setState({items: advents})
            }).catch(e => log(e))
    } else {
        x => window.location.hash = '#/'
        }
    }
    
    render(){
        return <div className="advent-element">
         <h3>your events</h3>
         <span></span>
                {this.state.items.map(Advent)}
            </div>
    }
}









