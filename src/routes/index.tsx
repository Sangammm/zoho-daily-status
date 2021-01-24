import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { globalStoreI } from '../types'
import { getAuth } from '../Utils/localStore'
import { Header } from '../components/Header'
import { routesList, routesKeys } from './config'

interface RouterI extends globalStoreI {}

export const Router: React.FC<RouterI> = (props) => {
	const { store, setStore } = props

	const isValiduser: boolean = React.useMemo(() => {
		const auth = getAuth() || {}
		return (store.accessToken && store.refreshToken && store.expires) ||
			(auth?.accessToken && auth?.refreshToken && auth?.expires)
			? true
			: false
	}, [store.accessToken, store.expires, store.refreshToken])

	React.useEffect(() => {
		setStore(getAuth() || {})
	}, [setStore])

	return (
		<BrowserRouter>
			{Object.keys(routesList).map((item: routesKeys) => {
				const { privateRoute, Component, path, exact } = routesList[item]
				return (
					<Route
						key={path}
						path={path}
						exact={exact}
						render={() =>
							privateRoute ? (
								isValiduser ? (
									<>
										<Header {...props} />
										<Component {...props} />
									</>
								) : (
									<Redirect to={routesList.login.path} />
								)
							) : (
								<>
									<Header {...props} />
									<Component {...props} />
								</>
							)
						}
					/>
				)
			})}
		</BrowserRouter>
	)
}
