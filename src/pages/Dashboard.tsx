import * as React from 'react'
import { globalStoreI } from '../types'
import { ProjectSelector } from '../components/ProjectSelector'



export const Dashboard: React.SFC<globalStoreI> = (props) => {

	return (
		<>
			<ProjectSelector {...props} />
		</>
	)
}

export default Dashboard
