import React, { useState, useContext } from 'react'
import { DefaultButton } from '@/styled-components/Button';
import Warehouse from '../../models/warehouse.model';
import WarehouseService from '@/services/warehouse.service';
import AppService from '@/services/app.service';

import './index.scss'
import { Navigate } from "react-router-dom";


export type FormCreateState = {
    warehouse: Warehouse
    file: string,
    isCreated?: boolean,
    isUploaded?: boolean,
    error: {
        er_code: string,
        er_name: string,
        er_address: string,
        er_city: string,
        er_state: string,
        er_country: string,
        er_zip: string,
        er_file: string,
    },
    serverError: string
}

const initialErrorState = {
    er_code: '',
    er_name: '',
    er_address: '',
    er_city: '',
    er_state: '',
    er_country: '',
    er_zip: '',
    er_file: '',
}

const initialWarehouseState = {
    code: 'A133',
    name: 'name',
    address: 'Malaponte 5523',
    city: 'Rosario',
    state: 'Santa Fe',
    country: 'Argentina',
    zip: '2000'
}

class WarehouseCreatePage extends React.Component<{}, FormCreateState> {

    constructor(props: any) {
        super(props)

        this.state = {
            warehouse: initialWarehouseState,
            serverError: '',
            file: '',
            isCreated: false,
            isUploaded: false,
            error: initialErrorState
        }
    }

    validate = (): boolean => {
        let _errors = { ...initialErrorState }

        let isValid = true

        this.setState({ error: _errors })

        if (this.state.warehouse.code === '') {
            isValid = false
            _errors.er_code = "Code Cannot be empty"
        }

        if (this.state.warehouse.name === '') {
            isValid = false;
            _errors.er_name = "Name Cannot be empty";
        }

        if (this.state.warehouse.address === '') {
            isValid = false;
            _errors.er_address = "Address Cannot be empty";
        }

        if (this.state.warehouse.city === '') {
            isValid = false;
            _errors.er_city = "City Cannot be empty";
        }

        if (this.state.warehouse.state === '') {
            isValid = false;

            _errors.er_state = "State Cannot be empty";
        }

        if (this.state.warehouse.country === '') {
            isValid = false;
            _errors.er_country = "Country Cannot be empty";
        }

        if (this.state.warehouse.zip === '') {
            isValid = false;
            _errors.er_zip = "Zip Cannot be empty";
        }

        this.setState({ error: _errors })

        return isValid
    }

    clearOnClick = async (event: any) => {

        let initialWarehouse = { ...initialWarehouseState }
        this.setState({ warehouse: initialWarehouse })
    }

    newButtonOnClick = async (event: any) => {
        if (this.validate()) {

            WarehouseService.create(this.state.warehouse).then(response => {
                
                if (response.success) {
                    this.setState({ isCreated: true })
                }

            }).catch(responseErr => {
                let _errors = { ...initialErrorState }

                // README //
                // this it works but it is not the best way to do it.
                // this is wrong way to solve it. it must be managed by error codes between the Server/Client

                if (responseErr.error === 'Invalid Warehouse code, already exists') {
                    _errors.er_code = responseErr.error
                    this.setState({ error: _errors })
                }
            })

        }
    }

    updateWarehouseState(key: string, value: string) {
        const lastWarehouse: any = { ...this.state.warehouse }
        lastWarehouse[key] = value
        this.setState({ warehouse: lastWarehouse })
    }


    handleFileChange = (e: any) => {

        this.setState({ file: e.target.files[0] })
    }

    render() {


        const uploadButtonOnClick = async (event: any) => {
            event.preventDefault()

            WarehouseService.uploadFile(this.state.warehouse, this.state.file).then(response => {
                if (response.success) {
                    this.setState({ isUploaded: true })
                    AppService.notification('Warehouse created successfully')
                    
                }
            })
        }

        return (
            <div id="warehouse_create" className='container'>
                <h5>Create a new Warehouse</h5>
                <hr />
                <div className="row">

                    <form className="col s12">

                        <div className="row">
                            <div className="input-field col s6">
                                <input id="code" type="text" className="validate" defaultValue={this.state.warehouse.code} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('code', e.target.value) }} />
                                <label className="" data-error="wrong" htmlFor="name">Code</label>
                                <span style={{ color: "red" }}>{this.state.error.er_code}</span>
                            </div>
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate" defaultValue={this.state.warehouse.name} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('name', e.target.value) }} />
                                <label className="" htmlFor="address">Name</label>
                                <span style={{ color: "red" }}>{this.state.error.er_name}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <input id="address" type="text" className="validate" defaultValue={this.state.warehouse.address} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('address', e.target.value) }} />
                                <label className="" htmlFor="name">Address</label>
                                <span style={{ color: "red" }}>{this.state.error.er_address}</span>
                            </div>
                            <div className="input-field col s6">
                                <input id="city" type="text" className="validate" defaultValue={this.state.warehouse.city} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('city', e.target.value) }} />
                                <label className="" htmlFor="address">City</label>
                                <span style={{ color: "red" }}>{this.state.error.er_city}</span>
                            </div>

                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <input id="state" type="text" className="validate" defaultValue={this.state.warehouse.state} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('state', e.target.value) }} />
                                <label className="" htmlFor="name">State</label>
                                <span style={{ color: "red" }}>{this.state.error.er_state}</span>
                            </div>
                            <div className="input-field col s6">
                                <input id="country" type="text" className="validate" defaultValue={this.state.warehouse.country} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('country', e.target.value) }} />
                                <label className="" htmlFor="country">Country</label>
                                <span style={{ color: "red" }}>{this.state.error.er_country}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <input id="state" type="text" className="validate" defaultValue={this.state.warehouse.zip} required={true} aria-required="true" onChange={(e) => { this.updateWarehouseState('zip', e.target.value) }} />
                                <label className="" htmlFor="name">Zip Code</label>
                                <span style={{ color: "red" }}>{this.state.error.er_zip}</span>
                            </div>
                        </div>

                        <div className="row center">
                            <div className="input-field col s3">
                                <DefaultButton className="waves-effect waves-light btn" type="button" onClick={this.newButtonOnClick} disabled={this.state.isCreated}>Create</DefaultButton>
                            </div>
                            <div className="input-field col s3">
                                <input type="reset" value="Clear" className='btn grey' onClick={this.clearOnClick} />
                            </div>

                        </div>

                        <div className="row center">
                            <span className='red-text'>{this.state.serverError}</span>
                        </div>

                        <br /><br />
                        {
                            (this.state.isCreated) &&
                            <div>

                                <h5>Uploud Warehouse list</h5>
                                <hr />
                                <p>upload list for warehouse: <b>{this.state.warehouse.code}</b></p>
                                <div className="row">
                                    <form encType="multipart/form-data" className="col s12" action="">
                                        <div className="row">
                                            <div className="input-field col s6">

                                                <div className="file-field input-field">
                                                    <div className="btn">
                                                        <span>Select List</span>
                                                        <input type="file" onChange={this.handleFileChange} />
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input className="file-path validate" type="text" />
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                (this.state.file) &&
                                                <div className="input-field col s6 submitWrapper">
                                                    <DefaultButton className="waves-effect waves-light btn" onClick={uploadButtonOnClick.bind(this)}>Upload</DefaultButton>
                                                </div>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }

                        {
                            (this.state.isUploaded) &&
                            <Navigate to="/" replace={true} />
                        }


                    </form>
                </div>
            </div>


        )
    }

}

export default WarehouseCreatePage