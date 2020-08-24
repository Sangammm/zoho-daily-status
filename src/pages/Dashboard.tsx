import * as React from 'react'
import { globalStoreI } from '../types'
import { ProjectSelector } from '../components/ProjectSelector'
import { Header } from '../components/Header'


export const Dashboard: React.SFC<globalStoreI> = (props) => {

	return (
		<>
			<Header {...props} />
			<ProjectSelector {...props} />
		</>
	)
}

export default Dashboard
