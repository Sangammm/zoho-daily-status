import * as React from 'react'
import { globalStoreValuesI } from '../types'

export const useValidUser = (store: globalStoreValuesI) => {
	const isUserValid = React.useMemo(() => {
		return store.accessToken && store.refreshToken && store.expires
			? true
			: false
	}, [store])

	return [isUserValid] as const
}
