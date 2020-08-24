import * as React from 'react'
import { globalStoreI } from '../types/index'
import { useHistory } from 'react-router-dom'
import { setAuth, getAuth } from '../Utils/localStore'

export interface HeaderProps extends globalStoreI {}

export const Header: React.SFC<HeaderProps> = ({ store, setStore }) => {
	const history = useHistory()
	const isValiduser: boolean = React.useMemo(() => {
		const auth = getAuth()
		return (store.accessToken && store.refreshToken && store.expires) ||
			(auth.accessToken && auth.refreshToken && auth.expires)
			? true
			: false
	}, [store.accessToken, store.expires, store.refreshToken])
	return (
		<div className="header">
			<h2>Zoho Daily Status</h2>
			{isValiduser && (
				<button
					onClick={() => {
						setStore({ accessToken: '', refreshToken: '', expires: null })
						setAuth({
							value: { accessToken: '', refreshToken: '', expires: null },
						})
						history.push('/login')
					}}
				>
					Logout{' '}
				</button>
			)}
		</div>
	)
}