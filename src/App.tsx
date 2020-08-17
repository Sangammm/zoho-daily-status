import React from 'react'

import { Router } from './Router'
import { globalStoreValuesI } from './types'
const App: React.FC = () => {
	/* This is my global Store  */
	const [store, setStore] = React.useState<globalStoreValuesI>({
		accessToken: '',
		refreshToken: '',
		expires: null,
	})

	return <Router store={store} setStore={setStore} />
}

export default App
