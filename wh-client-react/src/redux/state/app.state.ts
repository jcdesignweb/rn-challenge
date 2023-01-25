import { createSlice, createAction } from '@reduxjs/toolkit';
import AuthService from '@/services/auth.service';
import { IUser } from '@/models';
import User from '@/models/user.model';

type AuthorizationType = {
	name: string,
	role: string,
	token: string
}

interface App {
	isLogged: boolean
	authorization?: User,
}

export const AppEmptyState: App = {
	isLogged: (AuthService.getToken() !== undefined),
	authorization: (AuthService.getUserData()),
};

export const appSlice = createSlice({
	name: 'app',
	initialState: AppEmptyState,
	reducers: {
		isLogged: (state, action) => { return { ...state, isLogged: action.payload } },
		setAuthorization: (state, action) => { return { ...state, authorization: action.payload } },
		/*
		createAppPackages: (state, action) => action.payload,
		handlerSocket: (state, action) => action.payload,
		setPackages: (state, action) => {
		  return {
			...state, allPackages: action.payload
		  }
		},
		*/
	}
});

export const { isLogged, setAuthorization } = appSlice.actions;


export default appSlice.reducer;
