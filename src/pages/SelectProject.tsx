import * as React from 'react';
import { globalStoreI } from "../types";
import { useParams } from 'react-router-dom';

export const SelectProject: React.SFC<globalStoreI> = () => {
	const params = useParams()
	console.log('params: ', params);
	return (
		<h1>Select Project</h1>
	)
}

export default SelectProject;