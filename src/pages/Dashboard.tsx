import * as React from 'react'
import { globalStoreI } from '../types'
import { ProjectSelector } from '../components/ProjectSelector'

export const Dashboard: React.FC<globalStoreI> = (props) => {
	return <ProjectSelector {...props} />
}

export default Dashboard
