import React, { useState } from 'react'
import { task, bug } from './StatusComp'

export interface DisplayTasksProps {
	taskList: task[]
	bugList: bug[]
}
const taskStatusTobeTested: string[] = ['open', 'in progress']

export const isProjectManagment = (task: task) => {
	return task?.tasklist?.name?.toLowerCase() === 'project management'
}

export const isInTomorrowTask = (task: task | bug) => {
	return taskStatusTobeTested.includes(
		task?.status?.name?.toLowerCase() || task?.status?.type?.toLowerCase()
	)
}

export const displayTime = (task: task | bug) => {
	const hours = Math.floor(task.total_minutes / 60)
	const minutes = Math.floor(task.total_minutes % 60)
	let displayTime = ''
	if (hours !== 0) {
		displayTime += `${hours}h`
	}
	if (minutes !== 0 && hours !== 0) {
		displayTime += ':'
	}
	if (minutes !== 0) {
		displayTime += `${minutes}m`
	}
	return displayTime
}

export const DisplayTodayTasks: React.FC<DisplayTasksProps> = ({
	taskList,
	bugList,
}) => {
	const [hideProjectManagment, setHideProjectManagment] = useState(false)
	const [insights, setInsights] = useState(false)
	const prjtMngFilter = (task: task) => {
		if (hideProjectManagment) {
			if (isProjectManagment(task)) {
				return false
			}
		}
		return true
	}

	return (
		<>
			<div className="absolute filters flex column">
				<div>
					<input
						type="checkbox"
						checked={hideProjectManagment}
						onChange={e => setHideProjectManagment(e.target.checked)}
					/>
					<label>Hide Project Managment</label>
				</div>
				<div>
					<input
						type="checkbox"
						checked={insights}
						onChange={e => setInsights(e.target.checked)}
					/>
					<label>Show Insights</label>
				</div>
			</div>

			<span>
				<b>Today's Task</b>
			</span>
			<ul>
				{taskList
					?.filter(task => prjtMngFilter(task))
					.map(task => (
						<li key={task?.id_string}>
							{`${task?.key} - ${task?.name} ${
								!insights ? '' : `- ${displayTime(task)}`
							} ${
								Number(task.percent_complete) !== 0
									? ` - [${task.percent_complete}%]`
									: ''
							}`}
						</li>
					))}
				{bugList?.map(bug => (
					<li key={bug?.id_string}>{`${bug?.key} - Issue - ${bug?.title} ${
						!insights ? '' : `- ${displayTime(bug)}`
					}`}</li>
				))}
			</ul>

			<span>
				<b>Tomorrow's Task</b>
			</span>
			<ul>
				{taskList
					?.filter(task => isInTomorrowTask(task) && !isProjectManagment(task))
					.map(task => (
						<li key={task?.id_string}>{`${task?.key} - ${task?.name}`}</li>
					))}
				{bugList
					?.filter(bug => isInTomorrowTask(bug))
					.map((bug: bug) => (
						<li
							key={bug?.id_string}
						>{`${bug?.key} - Issue - ${bug?.title}`}</li>
					))}
			</ul>
			<span>
				<b>Blockers</b>
			</span>
			<ul>
				<li>None</li>
			</ul>
		</>
	)
}
