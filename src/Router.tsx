import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { globalStoreI } from './types'
import { getAuth } from './Utils/localStore'
import { useValidUser } from './Hooks/isUserValid'

interface routesListI {
	[key: string]: {
		path: string
		exact: boolean
		privateRoute: boolean
		Component: React.LazyExoticComponent<React.FC<globalStoreI>>
	}
}

export const routesList: routesListI = {
	dashboard: {
		path: '/',
		Component: React.lazy(() => import('./pages/Dashboard')),
		privateRoute: true,
		exact: true,
	},
	login: {
		path: '/login',
		Component: React.lazy(() => import('./pages/Login')),
		privateRoute: false,
		exact: true,
	},
	oauth: {
		path: '/oauth',
		Component: React.lazy(() => import('./pages/Oauth')),
		privateRoute: false,
		exact: true,
	},
	projects: {
		path: 'portal/:portal',
		Component: React.lazy(() => import('./pages/SelectProject')),
		privateRoute: true,
		exact: true,
	},
}

interface RouterI extends globalStoreI {}

export const Router: React.FC<RouterI> = (props) => {
	const { store, setStore } = props

	const isValiduser: boolean = React.useMemo(() => {
		const store = getAuth()
		return store.accessToken && store.refreshToken && store.expires
			? true
			: false
	}, [])

	React.useEffect(() => {
		setStore(getAuth())
	}, [setStore])

	return (
		<BrowserRouter>
			{Object.keys(routesList).map((item: string) => {
				const { privateRoute, Component, path, exact } = routesList[item]
				return (
					<Route
						key={path}
						path={path}
						exact={exact}
						render={() =>
							privateRoute ? (
								isValiduser ? (
									<Component {...props} />
								) : (
									<Redirect to={routesList.login.path} />
								)
							) : (
								<Component {...props} />
							)
						}
					/>
				)
			})}
		</BrowserRouter>
	)
}
