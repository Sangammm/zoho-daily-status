import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { globalStoreI } from './types'
import { getAuth } from './Utils/localStore'
import { Header } from './components/Header'

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
}

interface RouterI extends globalStoreI {}

export const Router: React.FC<RouterI> = (props) => {
	const { store, setStore } = props
	console.log('store: ', store)

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
