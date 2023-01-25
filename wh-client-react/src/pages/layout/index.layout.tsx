import { Outlet } from "react-router-dom"
import { useEffect } from 'react'
import { Header } from "./header/index.component"

import M from 'materialize-css'

import './index.scss'

export const Layout = () => {

	useEffect(() => {
		M.AutoInit()
	})

	return (
		<div className="App">
			<Header />
			<div className='container'>
				<Outlet />
			</div>

		</div>
	)
}

export default Layout