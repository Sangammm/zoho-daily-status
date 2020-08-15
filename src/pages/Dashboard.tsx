import * as React from 'react'
import { globalStoreI } from '../types'
import { getAuth } from '../Utils/localStore'
import { initiateZohoAuth } from '../api/'

interface DashboardI extends globalStoreI {}

export const Dashboard: React.SFC<globalStoreI> = ({ store, setStore }) => {
	React.useEffect(() => {
		setStore(getAuth())
	}, [setStore])

	const isUserValid = React.useMemo(() => {
		return store?.accessToken && store.refreshToken && store.expires
	}, [store])

	return isUserValid ? (
		<h1>Oh you got token huhh! Cool</h1>
	) : (
		<button onClick={initiateZohoAuth}>Zoho Login</button>
	)
}

export default Dashboard
