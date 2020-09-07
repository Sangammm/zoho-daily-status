import React, { useState } from 'react'
import { task, bug } from './StatusComp'

export interface DisplayTasksProps {
	taskList: task[]
	bugList: bug[]
	taskStatusTobeTested: string[]
}
export const DisplayTodayTasks: React.SFC<DisplayTasksProps> = ({
	taskList,
	bugList,
	taskStatusTobeTested,
}) => {
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
		return taskStatusTobeTested.includes(task?.status?.type?.toLowerCase())
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

			<span>Today's Task</span>
			<ul>
				{taskList?.map((task) => {
					return (
						prjtMngFilter(task) && (
							<li key={task?.id_string}>{`${task?.key} - ${task?.name}`}</li>
						)
					)
				})}
				{bugList?.map((bug) => (
					<li key={bug?.id_string}>{`${bug?.key} - Bug - ${bug?.title} `}</li>
				))}
			</ul>

			<span>Tomorrow's Task</span>
			<ul>
				{taskList?.map((task) => {
					return (
						isInTomorrowTask(task) &&
						!isProjectManagment(task) && (
							<li key={task?.id_string}>{`${task?.key} - ${task?.name} `}</li>
						)
					)
				})}
				{bugList?.map(
					(bug: bug) =>
						isInTomorrowTask(bug) && (
							<li
								key={bug?.id_string}
							>{`${bug?.key} - Bug - ${bug?.title} `}</li>
						)
				)}
			</ul>
			<span>Blockers</span>
			<ul>
				<li>None</li>
			</ul>
		</>
	)
}
