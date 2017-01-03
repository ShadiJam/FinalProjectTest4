// 'using' statements
import "babel-polyfill"
import React, {Component} from 'react'
import {render} from 'react-dom'

import 'moment'
import {BootstrapTable, TableHeaderColumn, ReactBsTable, colGroup } from 'react-bootstrap-table';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Header, Employee, Advent, Advance, Section, Category, Option, EventLocation } from './components'
import { Forms, AdventForm, NewEvent, AdventPage, update, rootComponent, prop } from './forms'
import { LoginForm, RegisterForm, Login, EmployeeView, DateRender } from './login'
import { Table } from './tables'


import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html
// console.log(Boot) // what hast thou provided?

// Utility methods
// --------------

export const get = (url) =>
    fetch(url, {
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
    })
    .then(r => {
        return r.json()
    })

export const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(r => r.json())

export const put = (url, data) => 
    fetch(url, { 
        method: 'PUT',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(r => r.json())

export const remove = (url, data) => 
    fetch(url, { 
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(r => r.json())  


// ----------------

export const log = (...a) => console.log(...a)

export const Error = () => <div>Page Not Found</div>

export const date = () => <Datetime />

export const moment = require('moment');

const Layout = ({children}) => 
        <div>
            <div>
                <Header />
            </div>
                {children}
        </div>

const reactApp = () =>
    render(

    <Layout>
        <Router history={hashHistory}>
            <Route path="/" component={Login}/>
            <Route path="/api/employee/:id" component={EmployeeView}/>
           
            <Route path="/build" component={AdventForm}/>
            <Route path="/build/:id" component={AdventForm}/>
            <Route path="/api/advent/:id" component={AdventPage}/>
            <Route path="/api/employee" component={Table}/>
            <Route path="*" component={Error}/>
        </Router>
    </Layout>,
    document.querySelector('.app'))

reactApp()




