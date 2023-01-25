import Map from '@/components/map/Map.component';
import WarehouseService from '@/services/warehouse.service';
import { useState } from 'react'

import './index.scss'

export function CalculationPage() {

    const [searchMark, setSearchMark] = useState('')
    const [searchText, setSearchText] = useState('Malaponte 5423, Rosario, Santa Fe, Argentina')

    const [warehousesPoints, setWarehousesPoints] = useState([])

    function findWarehouse() {
        setWarehousesPoints([])

        if(searchText !== '') {
            WarehouseService.findNearest(searchText).then((result) => {
                console.log("FindNearest response")
                const {response} = result

                setSearchMark(response.searchLocation)
                setWarehousesPoints(response.markers)
            })
        }
    }

    return (
        <div id='warehouse_nearest' className='container'>

            <br /><br />

            <div><input type='text' placeholder='' /></div>
            <div className="row">
                <div className="input-field col s6">
                    <input id="code" type="text" className="validate" aria-required="true" defaultValue={searchText} onChange={(e: any) => { setSearchText(e.target.value)  }} />
                    <label className="" data-error="wrong" htmlFor="name">Your Address</label>
                </div>
                <div className="input-field col s6">
                    <button className='btn default btnSearch' onClick={findWarehouse}>Find nearest <i className="material-icons left">search</i></button>
                </div>
            </div>

            {searchMark &&
                <Map searchMarkerCoors={searchMark} markers={warehousesPoints} />
            }

        </div>
    )
}


export default CalculationPage