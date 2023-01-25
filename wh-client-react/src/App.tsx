import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Loader from './components/loader/index.component'
import RequireAuth from './components/require-auth/RequireAuth.component';
import Layout from './pages/layout/index.layout'
import Login from './pages/login/index.page'
import AuthService from '@/services/auth.service'
import { isLogged } from "@/redux/state/app.state"
import { AppStore } from '@/redux/store';

import './App.css'
import { Home } from './pages/home/index.page'
import WarehouseCreatePage from './pages/warehouse/create.page'
import CalculatePage from './pages/calculate/index.page'


function App() {
	const { isLogged } = useSelector((store: AppStore) => store.app);

	if (isLogged === false) {
		return <Login />
	}

	return (

		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/warehouse/new" element={<WarehouseCreatePage />} />
					<Route element={<RequireAuth allowedRoles={["manager"]} />}>
						<Route path="/calculate" element={<CalculatePage />} />
					</Route>

				</Route>
			</Routes>
		</Router>
	)

}

export default App
