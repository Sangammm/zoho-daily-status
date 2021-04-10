import React, { useState } from 'react'
import { task, bug } from './StatusComp'
import { isInTomorrowTask, isProjectManagment } from '../Utils/taskFuncs'
import { Task } from './Task'
export interface DisplayTasksProps {
	taskList: task[]
	bugList: bug[]
}

export const DisplayTodayTasks: React.FC<DisplayTasksProps> = ({
	taskList,
	bugList,
}) => {
	const [isProjectManagmentVisible, setIsProjectManagmentVisible] = useState(
		true
	)
	const [isInsightVisible, setIsInsightVisible] = useState(false)

	return (
		<>
			<div className="absolute filters flex column">
				<div>
					<input
						type="checkbox"
						checked={isProjectManagmentVisible}
						onChange={(e) => setIsProjectManagmentVisible(e.target.checked)}
					/>
					<label>Project Managment</label>
				</div>
				<div>
					<input
						type="checkbox"
						checked={isInsightVisible}
						onChange={(e) => setIsInsightVisible(e.target.checked)}
					/>
					<label>Insights</label>
				</div>
			</div>

			<span>
				<b>Today's Task</b>
			</span>
			<ul>
				{taskList
					?.filter((task) => isProjectManagmentVisible || !isProjectManagment(task))
					.map((task) => (
						<Task
							key={task.id_string}
							code={task.key}
							name={task.name}
							total_minutes={task.total_minutes}
							showInsight={isInsightVisible}
							percent_complete={task.percent_complete}
						/>
					))}
				{bugList?.map((bug) => (
					<Task
						isBug={true}
						code={bug.key}
						name={bug.title}
						total_minutes={bug.total_minutes}
						showInsight={isInsightVisible}
						key={bug.id_string}
					/>
				))}
			</ul>

			<span>
				<b>Tomorrow's Task</b>
			</span>
			<ul>
				{taskList
					?.filter(
						(task) => isInTomorrowTask(task) && !isProjectManagment(task)
					)
					.map((task) => (
						<Task code={task.key} name={task.name} />
					))}
				{bugList
					?.filter((bug) => isInTomorrowTask(bug))
					.map((bug: bug) => (
						<Task code={bug.key} name={bug.title} isBug={true} />
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
