import React from 'react'
import './StatusComp.scss'
import { DisplayTodayTasks } from './DisplayTasks'
export interface StatusCompProps {
	tasksList: projectDetail[]
}
export interface task {
	id_string: string
	key: string
	name: string
	tasklist: tasklist
	status: status
}
export interface bug {
	id_string: string
	key: string
	title: string
	status: status
}
export interface tasklist {
	name: string
}
export interface status {
	name: string
}
export interface projectDetail {
	name: string
	id_string: string
	taskList: task[]
	bugList: bug[]
}

export const StatusComp: React.FC<StatusCompProps> = ({ tasksList }) => {
	const taskStatusTobeTested: string[] = ['open', 'in progress']

	return (
		<div>
			{tasksList.map((item: projectDetail) => (
				<div className="card" key={item.id_string}>
					<h3>{item.name}</h3>

					<div className="tasklist">
						<DisplayTodayTasks
							bugList={item.bugList}
							taskList={item.taskList}
							taskStatusTobeTested={taskStatusTobeTested}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default StatusComp
