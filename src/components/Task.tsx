import React from 'react'
import { displayTime } from '../Utils/taskFuncs'
export interface ITask {
	code: string
	name: string
	showInsight?: boolean
	percent_complete?: number
	total_minutes?: number
	isBug?: boolean
}
export const Task: React.FC<ITask> = ({
	code,
	name,
	showInsight = false,
	percent_complete = 0,
	total_minutes = 0,
	isBug = false,
}) => (
	<li contentEditable={true}>
		{`${code} - ${isBug ? 'Issue -' : ''} ${name} ${
			!showInsight ? '' : `- ${displayTime({ total_minutes })}`
		} ${Number(percent_complete) !== 0 ? ` - [${percent_complete}%]` : ''}`}
	</li>
)
