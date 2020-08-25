import React, { useEffect } from 'react'
import { globalStoreI } from '../types'
import { tokenApi } from '../api'
import { setAuth } from '../Utils/localStore'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
interface tokenResponseI {
	data: {
		access_token: string
		refresh_token: string
		expires_in: string
	}
}
interface OauthI extends globalStoreI {}
export const Oauth: React.SFC<globalStoreI> = ({ store, setStore }) => {
	const history = useHistory()

	useEffect(() => {
		const getToken = async () => {
			const params = new URL(window.location.href).searchParams
			const code = params.get('code')
			const redirect_uri = `${window.location.origin}/oauth`
			if (!code) {
				history.replace('/')
			}
			try {
				const { data }: tokenResponseI = await tokenApi.post('/token', {
					code,
					redirect_uri,
				})
				const { access_token, refresh_token, expires_in } = data
				const expires = moment().add(expires_in, 'seconds')
				setStore({
					accessToken: access_token,
					refreshToken: refresh_token,
					expires,
				})
				setAuth({
					value: {
						accessToken: access_token,
						refreshToken: refresh_token,
						expires,
					},
				})
				setTimeout(() => {
					history.push('/')
				}, 500)
			} catch (error) {
				history.push('/')
			}
		}
		getToken()
	}, [history, setStore])

	return (
		<div>
			<h4>Authorizing you.......</h4>
		</div>
	)
}
export default Oauth
