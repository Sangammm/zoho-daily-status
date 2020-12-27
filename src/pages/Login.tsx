import * as React from 'react'
import { globalStoreI } from '../types'
import { initiateZohoAuth } from '../api'
import { useHistory } from 'react-router-dom'
import { routesList } from '../Router'
import './Login.scss'
export interface LoginProps {}

const Login: React.FC<globalStoreI> = (props) => {
	const { store } = props
	const history = useHistory()
	React.useEffect(() => {
		if (store.accessToken && store.expires) {
			history.push(routesList.dashboard.path)
		}
	}, [history, store.accessToken, store.expires])
	return (
		<>
			<div className="login">
				<button onClick={initiateZohoAuth}>Zoho Login</button>
				<p>
					We need your permission to read timesheet and task info to create your
					status
				</p>
			</div>
		</>
	)
}

export default Login
