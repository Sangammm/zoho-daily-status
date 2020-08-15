import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { globalStoreI } from './types'

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
								localStorage.getItem('accessToken') ? (
									<Component {...props} />
								) : (
									<Redirect to={routesList.Login.path} />
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
