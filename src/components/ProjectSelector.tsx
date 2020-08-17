import React, { useState } from 'react'
import { getPortals } from '../api/index'
import { globalStoreI } from '../types'
import { useHistory } from 'react-router-dom'
export interface ProjectSelectorI extends globalStoreI {}
export interface portalsI {
	name: string
	id: number
	projects: any
}

export const ProjectSelector: React.FC<ProjectSelectorI> = ({ store }) => {
	const [portals, setPortals] = useState<Array<portalsI>>([])
	const [projects, setProjects] = useState<Array<any>>([])
	const [pid, setPid] = useState<number | null>()
	const history = useHistory()

	React.useEffect(() => {
		const portalRequest = async () => {
			const portals: Array<portalsI> = await getPortals({
				store,
			})
			console.log(portals)

			portals.length === 1 && setProjects(portals[0].projects)

			setPortals(portals)
		}
		portalRequest()
	}, [history, store])

	React.useEffect(() => {
		const project = projects.find((item) => item.id === pid)
		console.log(project?.name, project?.id, portals[0]?.id)
	}, [pid])

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>
				{portals.length > 1 && (
					<div>
						<h4>Select Portal</h4>
						<select onChange={(e) => console.log(e.target.value)}>
							{portals &&
								portals.map((item) => (
									<option key={item.id}>{item.name}</option>
								))}
						</select>
					</div>
				)}
				{projects.length > 0 && (
					<div>
						<h4>Select Project</h4>
						<select onChange={(e) => setPid(parseInt(e.target.value))}>
							<>
								<option value={0}>Select Project</option>
								{projects &&
									projects.map((item) => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
							</>
						</select>
					</div>
				)}
			</div>
			{pid && pid > 0 && <h4>{pid}</h4>}
		</>
	)
}

export default ProjectSelector
