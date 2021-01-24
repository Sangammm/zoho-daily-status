import * as React from 'react'
import { globalStoreI } from '../types'

export type routesKeys = 'dashboard' | 'login' | 'oauth' | string

type routesListI = {
	[key in routesKeys]: {
		path: string
		exact: boolean
		privateRoute: boolean
		Component: React.LazyExoticComponent<React.FC<globalStoreI>>
	}
}

export const routesList: routesListI = {
	dashboard: {
		path: '/',
		Component: React.lazy(() => import('../pages/Dashboard')),
		privateRoute: true,
		exact: true,
	},
	login: {
		path: '/login',
		Component: React.lazy(() => import('../pages/Login')),
		privateRoute: false,
		exact: true,
	},
	oauth: {
		path: '/oauth',
		Component: React.lazy(() => import('../pages/Oauth')),
		privateRoute: false,
		exact: true,
	},
}
