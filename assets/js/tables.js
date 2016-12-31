import {BootstrapTable, TableHeaderColumn, ReactBsTable, btnGroup, searchPanel } from 'react-bootstrap-table';
import { employeeModel, adventModel } from './models'
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'

import {render} from 'react-dom'


import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Navbar, NavItem, NavDropdown, MenuItem, DateTimePicker, DateTimeField } from 'react-bootstrap';

import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Forms, AdventForm, NewEvent, AdventPage, update, rootComponent, prop } from './forms'
import { LoginForm, RegisterForm, Login, EmployeeView, DateRender } from './login'

export class CustomToolBarTable extends Component {
    createCustomToolBar(props) {
        return (
            <div style={ { margin: '15px'} }>
            { props.components.btnGroup }
            <div className='col-xs-8 col-sm-4 col-lg-2'>
            { props.components.searchPanel }
            </div>
        </div>
        )
    }
    componentDidMount() {
        get('api/employees').then(employees => {
            this.setState({data: employees})
        }).catch(e => log(e))
    }
    render() {
        const selectRow = {
            mode: 'checkbox',
            showOnlySelected: true
        }
        const options = {
            toolBar: this.createCustomToolBar
        }
        return (
            <BootstrapTable data= { employees }
            options={ options }
            selectRow={ selectRow }
            insertRow
            deleteRow
            exportCSV
            search>
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




  

