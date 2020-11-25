import { task, bug } from '../components/StatusComp'

const taskStatusTobeTested: string[] = ['open', 'in progress']

export const isProjectManagment = (task: task): boolean => {
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
