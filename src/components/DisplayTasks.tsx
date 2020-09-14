import React, { useState } from 'react'
import { task, bug } from './StatusComp'

export interface DisplayTasksProps {
	taskList: task[]
	bugList: bug[]
}
export const DisplayTodayTasks: React.FC<DisplayTasksProps> = ({
	taskList,
	bugList,
}) => {
	const taskStatusTobeTested: string[] = ['open', 'in progress']
	const [hideProjectManagment, setHideProjectManagment] = useState(false)

	const prjtMngFilter = (task: task) => {
		if (hideProjectManagment) {
			if (isProjectManagment(task)) {
				return false
			}
		}
		return true
	}

	const isProjectManagment = (task: task) => {
		return task?.tasklist?.name?.toLowerCase() === 'project management'
			? true
			: false
	}

	const isInTomorrowTask = (task: task | bug) => {
		return taskStatusTobeTested.includes(task?.status?.name?.toLowerCase())
	}

	const displayTime = (task: task | bug) => {
		const hours = Math.floor(task.total_minutes / 60)
		const minutes = Math.floor(task.total_minutes % 60)
		let displayTime = ''
		if (hours !== 0) {
			displayTime += `${hours}h`
		}
		if (minutes !== 0 && hours !== 0) {
			displayTime += ':'
		}
		if(minutes !== 0){
			displayTime += `${minutes}m`
		}
		return displayTime
	}

	return (
		<>
			<div className="absolute right top">
				<input
					type="checkbox"
					checked={hideProjectManagment}
					onChange={(e) => setHideProjectManagment(e.target.checked)}
				/>
				<label>Hide Project Managment</label>
			</div>

			<span><b>Today's Task</b></span>
			<ul>
				{taskList?.map((task) => {
					return (
						prjtMngFilter(task) && (
							<li key={task?.id_string}>{`${task?.key} - ${
								task?.name
							} - ${displayTime(task)} ${
								task.percent_complete != 0
									? ` - [${task.percent_complete}%]`
									: ''
							}`}</li>
						)
					)
				})}
				{bugList?.map((bug) => (
					<li key={bug?.id_string}>{`${bug?.key} - Issue - ${bug?.title} - ${displayTime(bug)}`}</li>
				))}
			</ul>

			<span><b>Tomorrow's Task</b></span>
			<ul>
				{taskList?.map((task) => {
					return (
						isInTomorrowTask(task) &&
						!isProjectManagment(task) && (
							<li key={task?.id_string}>{`${task?.key} - ${task?.name}`}</li>
						)
					)
				})}
				{bugList?.map(
					(bug: bug) =>
						isInTomorrowTask(bug) && (
							<li
								key={bug?.id_string}
							>{`${bug?.key} - Issue - ${bug?.title}`}</li>
						)
				)}
			</ul>
			<span><b>Blockers</b></span>
			<ul>
				<li>None</li>
			</ul>
		</>
	)
}
