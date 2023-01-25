import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { appSlice } from './state/app.state';
import thunkMiddleware from 'redux-thunk'

export interface AppStore {
	app: any;
}


export default configureStore({
	reducer: {
		app: appSlice.reducer
	},
	middleware: [thunkMiddleware]
});

