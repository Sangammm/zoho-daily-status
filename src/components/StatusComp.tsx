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
	percent_complete: number
	total_minutes: number
}
export interface bug {
	id_string: string
	key: string
	title: string
	status: status
	total_minutes: number
}
export interface tasklist {
	name: string
}
export interface status {
	type: string
	name: string
}
export interface projectDetail {
	name: string
	id_string: string
	taskList: task[]
	bugList: bug[]
}

export const StatusComp: React.FC<StatusCompProps> = ({ tasksList }) => {
	return (
		<div>
			{tasksList.map((item: projectDetail) => (
				<div className="card" key={item.id_string}>
					<h3>{item.name}</h3>
					<div className="tasklist">
						<DisplayTodayTasks
							bugList={item.bugList}
							taskList={item.taskList}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default StatusComp
