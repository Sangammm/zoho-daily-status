import React, { useState } from 'react'
import { getStatus } from '../api/index'
import { globalStoreI } from '../types'
import { StatusComp } from './StatusComp'
export interface ProjectSelectorI extends globalStoreI {}
export interface portalsI {
	name: string
	id: number
	projects: any[]
}
const date = new Date()

const todayDate = `${date.getFullYear()}-${(date.getMonth() + 1)
	.toString()
	.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

export const ProjectSelector: React.FC<ProjectSelectorI> = ({ store }) => {
	const [portals, setPortals] = useState<Array<portalsI>>([])
	const [tasksList, setTaskList] = useState<Array<any>>([])
	const [date, setDate] = useState<string>(todayDate)
	const [pid, setPid] = useState<number>()
	const [loading, setLoading] = useState<boolean>(false)

	React.useEffect(() => {
		const getTaskData = async () => {
			try {
				setLoading(true)
				const taskList = await getStatus({
					date,
					portalId: pid,
				})
				setTaskList(taskList.uniqueProjects)
			} catch (error) {
				if (error.portals) {
					setPortals(error.portals)
				}
			} finally {
				setLoading(false)
			}
		}
		getTaskData()
	}, [date, store, pid])

	return (
		<>
			<div className="mainContainer">
				{portals.length > 1 ? (
					<div>
						<h4>Select Portal</h4>
						<select onChange={e => setPid(parseInt(e.target.value))}>
							{portals &&
								portals.map(item => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
						</select>
					</div>
				) : (
					<>
						<div className="dateselector">
							<input
								type="date"
								value={date}
								onChange={e => setDate(e.target.value)}
								disabled={loading}
							/>
						</div>
						{loading ? (
							'Loading...'
						) : tasksList.length > 0 ? (
							<StatusComp tasksList={tasksList} />
						) : (
							<h3>Select different date. We coudn't find any timelog</h3>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default ProjectSelector
