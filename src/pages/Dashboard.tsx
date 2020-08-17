import * as React from 'react'
import { globalStoreI } from '../types'
import { setAuth } from '../Utils/localStore'

import { useHistory } from 'react-router-dom'
import { ProjectSelector } from '../components/ProjectSelector'
interface DashboardI extends globalStoreI {}

export const Dashboard: React.SFC<globalStoreI> = (props) => {
	const { setStore } = props
	const history = useHistory()

	return (
		<>
			<button
				onClick={() => {
					setStore({ accessToken: '', refreshToken: '', expires: null })
					setAuth({
						value: { accessToken: '', refreshToken: '', expires: null },
					})
					history.push('/login')
				}}
			>
				Logout{' '}
			</button>
			<ProjectSelector {...props} />
		</>
	)
}

export default Dashboard
