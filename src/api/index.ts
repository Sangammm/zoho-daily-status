import Axios, { AxiosInstance } from 'axios'

import { API_URL, CLIENT_ID } from '../Utils/env'
export const tokenApi: AxiosInstance = Axios.create({
	baseURL: API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})
export const initiateZohoAuth = () => {
	const redirect_uri: string = `${window.location.origin}/oauth`
	const scope: string = 'ZohoProjects.timesheets.ALL'
	const access_type: string = 'offline'
	const response_type: string = 'code'
	const url = `https://accounts.zoho.com/oauth/v2/auth?scope=${scope}&client_id=${CLIENT_ID}&response_type=${response_type}&access_type=${access_type}&redirect_uri=${redirect_uri}&prompt=consent`
	window.location.replace(url)
}
