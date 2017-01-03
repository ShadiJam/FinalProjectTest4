import {BootstrapTable, TableHeaderColumn, ReactBsTable, colGroups, InsertRowTable, DeleteRowTable, MultiSearchTable, ExportCSVTable, cellEditProp } from 'react-bootstrap-table';
import { employeeModel, adventModel } from './models'
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'

import {render} from 'react-dom'
import {get, post, put, log } from './app'

import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Navbar, NavItem, NavDropdown, MenuItem, DateTimePicker, DateTimeField } from 'react-bootstrap';

import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Forms, AdventForm, NewEvent, AdventPage, update, rootComponent, prop } from './forms'
import { LoginForm, RegisterForm, Login, EmployeeView, DateRender, onAfterInsertRow, onAfterDeleteRow, selectRowProp, options } from './login'

export class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount(data) {
        get('api/employee').then(employees => {
            this.setState({items: employees})
        }).catch(e => log(e))
    }
        csvFormatter(cell, row) {
    return `${row.id}: ${cell} USD`
    }
    
    render() {
        return (
            <BootstrapTable data= { this.state.items } search={ true } cellEdit={ cellEditProp } exportCSV={true} deleteRow={ true } selectRow={ selectRowProp } insertRow={ true } options={ options }>
            
            <TableHeaderColumn dataField='id' isKey={true}>Employee ID</TableHeaderColumn>
                <TableHeaderColumn dataField='fName' >First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='lName'  >Last Name</TableHeaderColumn>
                <TableHeaderColumn dataField='department' >Department</TableHeaderColumn>
                <TableHeaderColumn dataField='position' >Position</TableHeaderColumn>
                <TableHeaderColumn dataField='phone' >Phone</TableHeaderColumn>
                <TableHeaderColumn dataField='email' >Email</TableHeaderColumn> 
    </BootstrapTable>
        )
    }
}

