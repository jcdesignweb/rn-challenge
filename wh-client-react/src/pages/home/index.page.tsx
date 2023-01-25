import { ChangePageButton } from '@/styled-components/Button'
import { Link } from 'react-router-dom'
import WarehouseGridView from "./grid-view/WarehouseGrid.component"

export const Home = () => {

    return (
        <div id="dashboard">
            <div className="row">
                <h3 className="title">
                    Warehouse Section
                </h3>

                <hr /><br />
                <WarehouseGridView />

            </div>

            <div className="row center">
                <Link to="/warehouse/new" className="ad"><ChangePageButton>New</ChangePageButton></Link>
            </div>
        </div>
    )
}