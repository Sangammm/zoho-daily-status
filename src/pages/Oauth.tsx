import React, { useEffect } from 'react'
import { globalStoreI, globalStoreValuesI } from '../types'
import { tokenApi } from '../api'
import { setAuth } from '../Utils/localStore'
import { Redirect, useHistory } from 'react-router-dom'
import moment from 'moment'
import { useMutation } from 'react-query'
interface tokenResponseI {
	access_token: string
	refresh_token: string
	expires_in: string
}

interface OauthI extends globalStoreI {}
export const Oauth: React.SFC<globalStoreI> = ({ store, setStore }) => {
	const history = useHistory()
	const params = new URL(window.location.href).searchParams
	const code = params.get('code')
	const redirect_uri = `${window.location.origin}/oauth`
	if (!code) {
		history.push('/login')
	}

	const setTokens = ({
		access_token,
		refresh_token,
		expires_in,
	}: tokenResponseI) => {
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
	}

	const mutationFn = (params: { code: string; redirect_uri: string }) => {
		return tokenApi.post('/token', params)
	}
	const { mutate } = useMutation(mutationFn, {
		mutationKey: '/token',
		onSuccess: (data) => {
			setTokens(data.data)
			history.replace('/')
		},
		onError: (err) => {
			history.replace('/login')
		},
	})
	useEffect(() => {
		code && mutate({ code, redirect_uri })
	}, [code, redirect_uri, mutate])

	return (
		<div>
			<h4>Authorizing you.......</h4>
		</div>
	)
}
export default Oauth
