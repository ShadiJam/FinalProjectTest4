// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn, InsertRowTable, DeleteRowTable, MultiSearchTable, ExportCSVTable } from 'react-bootstrap-table';

import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { get, post, log, Error, Layout, reactapp } from './app'
import Forms from './forms'
import { update, rootComponent, prop } from './forms'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, EventLocation, EmployeeTable} from './components'
import * as models from './models'


export class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            IdentityUser: null
        }
    }
     submit(e) {
        e.preventDefault()
        console.log({
            email: this.refs.email.value,
            password: this.refs.password.value
        })
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

function onAfterInsertRow(row) {
    let newRowStr = '';
    log(e)
    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
    log(e)
     alert('The new row is:\n ' + newRowStr);
}


export function onAfterDeleteRow(rowKeys) {
  alert('The rowkey you drop: ' + rowKeys);
}

const selectRowProp = {
  mode: 'checkbox'
}



const options = {
  afterInsertRow: onAfterInsertRow,  
  afterDeleteRow: onAfterDeleteRow,
  defaultSearch: ''
};

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
    csvFormatter(cell, row) {
    return `${row.id}: ${cell} USD`
  }

    
render() {
        return (
            <BootstrapTable data= { this.state.items } search={ true } exportCSV={true} deleteRow={ true } selectRow={ selectRowProp } insertRow={ true } options={ options }>
            
            <TableHeaderColumn dataField='id' isKey={true} >Event ID</TableHeaderColumn>
                <TableHeaderColumn dataField='eventName' >Event Name</TableHeaderColumn>
                <TableHeaderColumn dataField='startDate'  >Start Date</TableHeaderColumn>
                <TableHeaderColumn dataField='endDate' >End Date</TableHeaderColumn>
    </BootstrapTable>
        )
    }
}









