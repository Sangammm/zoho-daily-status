import * as React from 'react'
import { globalStoreI } from '../types'
import { initiateZohoAuth } from '../api'
export interface LoginProps {}

const Login: React.SFC<globalStoreI> = () => {
	return <button onClick={initiateZohoAuth}>Zoho Login</button>
}

export default Login
