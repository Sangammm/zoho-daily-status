import * as React from 'react'
import { globalStoreValuesI } from '../types'

export const useValidUser = (store: globalStoreValuesI):boolean => {
	const isUserValid = React.useMemo(() => {
		return store.accessToken && store.refreshToken && store.expires
			? true
			: false
	}, [store])

	return isUserValid
}
