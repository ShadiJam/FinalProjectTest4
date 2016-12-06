import React, {Component} from 'react'
import * as models from './models'
import {get, post} from './app'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

let update // DANGER WILL ROBINSON, DOUNT TOUCH ME

export default class AdventForm extends Component {
    constructor(){
        super()
        this.state = {
            advances: [],
            employees: [],
            rOs: []
        }
        update = () => this.forceUpdate()
    }
    pushNewEmployee(e){
        e.preventDefault()
        let {employees} = this.state
        this.setState({ employees: [...employees, models.employeeModel()] })
    }
    pushNewAdvance(e){
        e.preventDefault()
        let {advances} = this.state
        this.setState({ advances: [...advances, models.advanceModel()] })
    }
    pushNewrO(e){
        e.preventDefault()
        let {rOs} = this.state

        this.setState({ rOs: [...rOs, models.rOModel()] })
    }
    save(e){
        e.preventDefault()
        console.log(this.state)
        post('/api/advent', this.state
        ).then(x => {
            window.location.hash = `#/status/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
    render(){
        return <div>
            <ul>
                {this.state.employees.map(e => <EmployeeForm employee={e}/>)}
                <button onClick={e => this.pushNewEmployee(e)}>Add another employee?</button>
            </ul>
            <ul>
                {this.state.advances.map(e => <AdvanceForm advance={e} employees={this.state.employees}/>)}
                <button onClick={e => this.pushNewAdvance(e)}>Add another advance?</button>
            </ul>
            <ul>
                {this.state.rOs.map(location => <LocationForm location={location}/>)}
                <button onClick={e => this.pushNewrO(e)}>Add another location?</button>
            </ul>
            
            <button onClick={e => this.save(e)}> BIG SAVE BUTTON </button>
        </div>
    }
}

export class EmployeeForm extends Component {
    constructor(props){
        super(props)
        // this.props.employee should be the object passed in as a prop
        // this.state = {}
    }
    change(e, name){
        e.preventDefault()
        this.props.employee[name] = this.refs[name].value
    }
    render(){
        return <div>
            <ul>
                <li> <input onChange={e => this.change(e, "fName")} onBlur={update} ref="fName" placeholder="First Name" defaultValue={this.props.employee.fName} /> </li>
                <li> <input onChange={e => this.change(e, "lName")} onBlur={update} ref="lName" placeholder="Last Name" defaultValue={this.props.employee.lName} /> </li>
                <li> <input onChange={e => this.change(e, "department")} onBlur={update} ref="department" placeholder="Department" defaultValue={this.props.employee.department} /> </li>
                <li> <input onChange={e => this.change(e, "phone")} ref="phone" onBlur={update} placeholder="Mobile Number" defaultValue={this.props.employee.phone} /> </li>
                <li> <input onChange={e => this.change(e, "email")} ref="email" onBlur={update} placeholder="email@email.com" defaultValue={this.props.employee.email} /> </li>
            </ul>
        </div>
    }
}

export class AdvanceForm extends Component {
    constructor(props){
        super(props)
        // this.props.advance is an object passed in that holds default or existing advance data
    }
    pushNewSection(e){
        e.preventDefault()
        let {sections} = this.state
        this.setState({ sections: [...sections, models.sectionModel()] })
    }
    change(e, advanceName, dueDate, assigned, isComplete){
        e.preventDefault()
        this.props.advance[advanceName] = this.refs.advanceName.value,
        this.props.advance[dueDate] = this.refs.dueDate.value,
        this.props.advance[assigned] = this.refs.assigned.value, // selection = true + needs to connect to employeeId upon save
        this.props.advance[isComplete] = this.refs.isComplete.value // yes = true, no = false
    }
    render(){
        return <div>
            <ul>
                <li> <input onChange={e => this.change(e, "advanceName")} ref="advanceName" placeholder="Advance Name" defaultValue={this.props.advance.advanceName} /> </li>
                <li> <input onChange={e => this.change(e, "dueDate")} ref="dueDate" placeholder="Due Date DD/MM/YR" defaultValue={this.props.advance.dueDate} /> </li>
                <li> <FormGroup onChange={e => this.change(e, "assigned")} ref="assigned" controlId="formControlsSelect">
                        <ControlLabel>Assign Advance</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">choose Employee</option>
                            {this.props.employees.map(e => <option value={e.id}>{e.fName}</option>)}
                        </FormControl>
                    </FormGroup>
                </li> 
                <li> 
                    <FormGroup onChange={e => this.change(e, "isComplete")} ref="isComplete" controlId="formControlsSelect">
                        <ControlLabel>Advance Complete?</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">Select</option>
                            <ul><option value="other">Yes</option></ul>
                            <ul><option value="other">No</option></ul>
                        </FormControl>
                    </FormGroup>
                </li>
            </ul>
            <ul>
                {(this.props.advance.sections || []).map(e => <SectionForm section={e}/>)}
                <button onClick={e => this.pushNewSection(e)}>Add another section?</button>
            </ul>
        </div>
    }
}


export class SectionForm extends Component {
    constructor(){
        super()
        // this.props.section is an object passed in that holds default or existing section data
        this.state = {
            rOs: [],
            categories: []
        }
    }
    pushNewrO(e){
        e.preventDefault()
        let {rOs} = this.state
        this.setState({ rOs: [...rOs, models.rOModel()] })
    }
    pushNewCategory(e){
        e.preventDefault()
        let {categories} = this.state
        this.setState({ categories: [...categories, models.categoryModel()] })
    }
    change(e, sectionName, sectionDescription){
        e.preventDefault()
        this.props.section[sectionName] = this.refs.sectionName.value,
        this.props.section[sectionDescription] = this.refs.sectionDescription.value
    }
    render(){
        return <div>
            <ul>
                <li> <input onChange={e => this.change(e, "sectionName")} ref="sectionName" placeholder="Section Name" defaultValue={this.props.section.sectionName} /> </li>
                <li> <input onChange={e => this.change(e, "sectionDescription")} ref="sectionDescription" placeholder="Brief Description - not required" defaultValue={this.props.section.sectionDescription} /> </li>
            </ul>
            <ul>
                {this.props.rOs.map(e => <LocationForm rO={e}/>)}
                <button onClick={e => this.pushNewrO(e)}>Add another location?</button>
            </ul>
            <ul>
                {this.props.categories.map(e => <CategoryForm category={e}/>)}
                <button onClick={e => this.pushNewCategory(e)}>Add another category?</button>
            </ul>
            
        </div>
    }
}

export class CategoryForm extends Component {
    constructor(props){
        super(props)
        // this.props.category is an object passed in that holds default or existing advance data
        this.state = {}
    }
    pushNewOption(e){
        e.preventDefault()
        let {options} = this.state
        this.setState({ options: [...options, models.optionModel()] })
    }
    change(e, categoryName){
        e.preventDefault()
        this.props.category[categoryName] = this.refs.categoryName.value
    }
    
    render(){
        return <div>
            <ul>
                <li> <input onChange={e => this.change(e, "categoryName")} ref="categoryName" placeholder="Category Name" defaultValue={this.props.category.categoryName} /> </li>
            </ul>
            <ul>
                {this.props.options.map(e => <OptionForm option={e}/>)}
                <button onClick={e => this.pushNewOption(e)}>Add another option?</button>
            </ul>
        </div>
    }
}

export class OptionForm extends Component {
    constructor(props){
        super(props)
        // this.props.option is an object passed in that holds default or existing advance data
        this.state = {}
    }
    change(e, optionName){
        e.preventDefault()
        this.props.option[optionName] = this.refs.optionName.value
    }
    render(){
        return <div>
            <ul>
                <li> <input onChange={e => this.change(e, "optionName")} ref="optionName" placeholder="Option Name" defaultValue={this.props.option.optionName} /> </li>
            </ul>
        </div>
    }
}

class LocationForm extends Component {
    constructor(props){
        super(props)
        // this.props.location is an object passed in that holds default or existing advance data
        this.state = {
            results: []
        }
    }
    click(e){
        e.preventDefault()
        if(!this.state.results.length) return
        const {location} = this.props
        Object.assign(location, this.state.results[0])
        update()
    }
   
    getLocation(e, address){
        e.preventDefault()
        var promise = get(`/api/rootobject/${this.refs.address.value}`)
        promise.then(resp => {
            if(!resp.results.length) return

            this.setState({results: resp.results})
            Object.assign(this.props.location, resp.results[0])
            update()
        })
        .catch(err => log(err)) 
    }
    
    render(){
        const results = this.state.results

        if(results.length){
            return <div className="location">
                <ul>
                    <li>{results[0].formatted_address}</li>
                    <li>{results[0].geometry.location.lat}</li>
                    <li>{results[0].geometry.location.lng}</li>
                </ul>
                <button onClick={e => this.click(e)} type="click">Add this Location to Advance</button> 
           </div>
        }
        
        const err = <ul className="compose-errors">
            {(this.state.errors || []).map(e => <li>{e}</li>)}
            </ul>
        
        return <div className="new-RO-form">
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                <div>
                    <input ref="address" placeholder="search locations by entering an address or zip code" /> 
                    <button onClick={e => this.getLocation(e)} type="submit">Search</button>
                </div>
        </div>          
    }
}


// not sure if I've added the above correctly, but what I'd like is that they do a location search, and then have the option to add the results to that advance and/or section  



    
            