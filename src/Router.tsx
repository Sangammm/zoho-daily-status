import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

interface routesListI {
	[key: string]: {
		path: string
		exact: boolean
		privateRoute: boolean
		Component: React.LazyExoticComponent<React.FunctionComponent>
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
export const Router: React.FC = () => {

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
									<Component />
								) : (
									<Redirect to={routesList.Login.path} />
								)
							) : (
								<Component />
							)
						}
					/>
				)
			})}
		</BrowserRouter>
	)
}
