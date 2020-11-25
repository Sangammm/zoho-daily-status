import Axios, { AxiosInstance } from 'axios'

import { API_URL, CLIENT_ID } from '../Utils/env'
import { getAuth, setAuth } from '../Utils/localStore'

export const tokenApi: AxiosInstance = Axios.create({
	baseURL: API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

tokenApi.interceptors.response.use(
	res => {
		return res
	},
	async error => {
		if (error?.response?.status === 401) {
			try {
				if (getAuth().refreshToken) {
					const newToken = await regenerate(getAuth().refreshToken)
					if (newToken?.access_token) {
						setAuth({
							value: { ...getAuth(), accessToken: newToken.access_token },
						})
					}
					return tokenApi.request({
						...error.config,
						headers: { Authorization: `Bearer ${getAuth().accessToken}` },
					})
				}
			} catch (error) {
				setAuth({ value: { accessToken: '', refreshToken: '', expires: '' } })
				window.location.replace('/login')
			}
		}
	}
)

const regenerate = async (refresh_token: string) => {
	try {
		const newToken = await tokenApi.post(
			'/regenerate',
			{},
			{ headers: { refresh_token } }
		)
		if (newToken?.data?.access_token) {
			return newToken.data
		} else {
			throw newToken.data
		}
	} catch (error) {
		throw error
	}
}

export const initiateZohoAuth = () => {
	const redirect_uri: string = `${window.location.origin}/oauth`
	const scopeArray = [
		'ZohoProjects.timesheets.READ',
		'ZohoProjects.portals.READ',
		'ZohoProjects.projects.READ',
		'ZohoProjects.bugs.READ',
		'ZohoProjects.tasks.READ',
		'ZohoProjects.users.READ',
	]
	const scope: string = scopeArray.join(',')
	const access_type: string = 'offline'
	const response_type: string = 'code'
	const url = `https://accounts.zoho.com/oauth/v2/auth?scope=${scope}&client_id=${CLIENT_ID}&response_type=${response_type}&access_type=${access_type}&redirect_uri=${redirect_uri}&prompt=consent`
	window.location.replace(url)
}

export const zohoApi: AxiosInstance = Axios.create({
	baseURL: 'https://projectsapi.zoho.com/restapi/',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

export const getPortals = async () => {
	const portalsResponse = await tokenApi.get('/users/projects', {
		headers: { Authorization: `Bearer ${getAuth().accessToken}` },
	})
	const { portals } = portalsResponse.data
	return portals
}

export const getStatus = async ({
	date,
	portalId,
}: {
	date: string
	portalId?: number
}) => {
	const portalsResponse = await tokenApi.get('/users/status', {
		headers: { Authorization: `Bearer ${getAuth().accessToken}` },
		params: { portalId, date },
	})
	const data = portalsResponse.data
	return data
}

export const logout = async () => {
	try {
		const logout = await tokenApi.post(
			'/logout',
			{
				refresh_token: getAuth().refreshToken,
			},
			{
				headers: { Authorization: `Bearer ${getAuth().accessToken}` },
			}
		)
		return logout.data
	} catch (error) {
		console.error(error)
		// throw error
	}
}
