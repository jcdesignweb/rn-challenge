import { ConfirmModal } from '@/components/confirm/Confirm.component';
import Warehouse from '@/models/warehouse.model';
import WarehouseService from '@/services/warehouse.service'
import { DefaultButton, DeleteButton } from '@/styled-components/Button';
import { useState, useEffect } from 'react'
import { downloadUrl } from '@/utils';
import { useFetchWrapper } from '@/lib/wrapper/fetch.wrapper';
import AppService from '@/services/app.service';


let modal: M.Modal

export const WarehouseGridView = () => {

    const [warehouses, setWarehouses] = useState(Array<Warehouse>);
    const [codeDelete, setCodeDelete] = useState('');
    const [nameDelete, setNameDelete] = useState('');

    useEffect(() => { getAllWarehouses() }, [])

    function getAllWarehouses() {
        WarehouseService.getAll().then((warehouses) => {
            const {response} = warehouses
            setWarehouses(response)
        }).catch(error => {
            console.error("error", error)
        })
    }

    function downloadOnClick(warehouse: Warehouse) {

        WarehouseService.downloadFile(warehouse).then((result: any) => {

            if (warehouse.list_file_name) {
                downloadUrl(result, warehouse.list_file_name)
            }
        })
    }

    function onDeleteConfirmed() {

        WarehouseService.delete(codeDelete).then((result)=> {
            AppService.notification('Warehouse deleted')
            getAllWarehouses()
        })
    }

    function deleteOnClick(warehouse_code: string, warehouse_name: string) {
        setCodeDelete(warehouse_code)
        setNameDelete(warehouse_name)

        const elem: any = document.getElementById("confirm_modal")
        modal = M.Modal.init(elem, {})
        modal.open()
    }

    return (
        <div id="grid-view">
            <h5>Grid view</h5>

            {warehouses.length == 0 &&
                <span><b>There is no any Warehouse in out database</b></span>
            }

            {warehouses.length > 0 &&
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Zip</th>
                                <th>Download</th>
                                <th></th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                warehouses.map((warehouse) => (
                                    <tr>
                                        <td>{warehouse.name}</td>
                                        <td>{warehouse.code}</td>
                                        <td>{warehouse.address}</td>
                                        <td>{warehouse.city}</td>
                                        <td>{warehouse.state}</td>
                                        <td>{warehouse.country}</td>
                                        <td>{warehouse.zip}</td>
                                        <td>
                                            {
                                                (warehouse.list_file_name) &&
                                                <DefaultButton className="btn" onClick={() => { downloadOnClick(warehouse) }}>Download</DefaultButton>
                                            }
                                            
                                        </td>
                                        <td><DeleteButton className='modal-trigger' onClick={() => { deleteOnClick(warehouse.code, warehouse.name) }}>Delete</DeleteButton></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    <ConfirmModal confirm={onDeleteConfirmed} name={nameDelete} />
                </>

            }

        </div>
    )
}

export default WarehouseGridView
