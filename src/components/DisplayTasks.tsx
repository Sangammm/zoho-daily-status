import React, { useState } from 'react'
import { task, bug } from './StatusComp'
import {
	displayTime,
	isInTomorrowTask,
	isProjectManagment,
} from '../Utils/taskFuncs'
export interface DisplayTasksProps {
	taskList: task[]
	bugList: bug[]
}

export const DisplayTodayTasks: React.FC<DisplayTasksProps> = ({
	taskList,
	bugList,
}) => {
	const [hideProjectManagment, setHideProjectManagment] = useState(false)
	const [insights, setInsights] = useState(false)
	const prjtMngFilter = (task: task) => {
		if (hideProjectManagment) {
			return !isProjectManagment(task)
		} else {
			return true
		}
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
