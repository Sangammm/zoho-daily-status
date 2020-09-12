import * as React from 'react'
import { globalStoreI } from '../types/index'
import { useHistory } from 'react-router-dom'
import { setAuth, getAuth } from '../Utils/localStore'
import { routesList } from '../Router'
import { logout } from '../api'

export interface HeaderProps extends globalStoreI {}

export const Header: React.FC<HeaderProps> = ({ store, setStore }) => {
	const history = useHistory()
	const isValiduser: boolean = React.useMemo(() => {
		const auth = getAuth()
		return (store.accessToken && store.refreshToken && store.expires) ||
			(auth?.accessToken && auth?.refreshToken && auth?.expires)
			? true
			: false
	}, [store.accessToken, store.expires, store.refreshToken])
	return (
		<div className="header">
			<h2>Zoho Daily Status</h2>
			{isValiduser && (
				<button
					onClick={async () => {
						await logout()
						setAuth({
							value: { accessToken: '', refreshToken: '', expires: null },
						})
						setStore({ accessToken: '', refreshToken: '', expires: null })
						history.push(routesList.login.path)
					}}
				>
					Logout{' '}
				</button>
			)}
		</div>
	)
}
