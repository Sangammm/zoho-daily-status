import { globalStoreValuesI } from '../types'

export interface IUser {
	id: number
	name: string
	address: string
	is_active: boolean
}

export interface IAuth extends globalStoreValuesI {}

const key = 'dailystatus'

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(key)
		if (!serializedState) {
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (err) {
		return undefined
	}
}

interface IState {
	auth: IAuth
	user: IUser
}

export const lcStateDef = {
	auth: 'auth',
	user: 'user',
}

export const saveState = (state: IState) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem(key, serializedState)
	} catch {
		// ignore write errors
	}
}

export const get = ({ key }: { key: string }) => {
	const state = loadState()
	return state?.[key]
}

export const set = ({ key, value }: { key: string; value: object }) => {
	const state = loadState() || {}
	const updatedState = {
		...state,
		[key]: value,
	}
	saveState(updatedState)
	return updatedState[key]
}

export const getAuth = (): IAuth => {
	return get({ key: lcStateDef.auth })
}

export const setAuth = ({ value }: { value: IAuth }) => {
	return set({ key: lcStateDef.auth, value })
}

export const getUser = (): IUser => {
	return get({ key: lcStateDef.user })
}

export const setUser = ({ value }: { value: IUser }): IUser => {
	return set({ key: lcStateDef.user, value })
}
