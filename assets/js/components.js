// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
import { get, post, log, Error, Layout, reactapp } from './app'
import { LoginForm, RegisterForm, Login, EmployeeView } from './login'
import { update, rootComponent, prop, DateRender } from './forms'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'




export const Header = () =>
    <div id="container" className="container">
        <ul id="secondary">
            <li className="key"><a className="key" href="#/">KEY</a></li>
            <li className="project"><h4><a className="project" href="#/api/employee/:id">event</a></h4></li>
            <li className="project"><h4><a href="#/build">build</a></h4></li>
            <li className="project"><h4><a href="#/api/employee">team</a></h4></li>
        </ul>
    </div>


export const Employee = (employee) =>
    <div className="employee">
        <ul className="employee-list">
        <li>{employee.fName}</li>
        <li>{employee.lName}</li>
        <li>{employee.department}</li>
        <li>{employee.position}</li>
        <li>{employee.phone}</li>
        <li>{employee.email}</li>
        <span></span>
        </ul>
    </div>



export const Advent = (advent) =>
    <div className="advent">
        <ul className="advent-list">
            <li>
                <a href={`#/build/${advent.id}`}>
                    <button className="build-button">Edit</button>
                </a>
            </li>
            <li>
                <a href={`#/api/advent/${advent.id}`}>
                    <h4> {advent.eventName} </h4>
                </a>
            </li>
        </ul>
    <span></span>
</div>

export const Advance = (advance) =>
    <div className="advance">
            <li>{advance.advanceName}</li>
            <li>{advance.isAssigned}</li>
            <span className="advent-view"></span>
            {(advance.sections || []).map(Section)}
    </div>

export const Section = (section) =>
    <div className="section">
        <h3>{section.sectionName}</h3>
        <li>{section.sectionDescription}</li>
        {(section.categories || []).map(Category)}
    </div>

export const Category = (category) =>
    <div className="category">
            <span className="advent-view"></span>
            <h4>{category.categoryName}</h4>
            {(category.options|| []).map(Option)}
    </div>

export const Option = (option) =>
    <div className="option">
        <li>{option.optionName}</li>
        <li><input onChange={e => this.change(e, "optionValue")} onBlur={update} ref="optionValue" placeholder="Enter Amount" required key={Math.random()} defaultValue={option.optionValue || ""}/></li>
    </div>

export const EventLocation = (eventLocation) =>
    <div className="event-location">
            <li>Address:    {eventLocation.formattedAddress}</li>
            <li>Latitude:   {eventLocation.lat}</li>
            <li>Longitude:   {eventLocation.lng}</li>
    </div>
    




          


    
          

    





       