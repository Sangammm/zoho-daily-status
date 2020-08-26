const env = process.env
const {
	NODE_ENV,
	REACT_APP_DEV_URL,
	REACT_APP_PROD_URL,
	REACT_APP_CLIENT_ID,
	REACT_APP_CLIENT_ID_PROD,
} = env

export const isDevelopment = NODE_ENV === 'development'
export const API_URL = isDevelopment ? REACT_APP_DEV_URL : REACT_APP_PROD_URL

export const CLIENT_ID = isDevelopment
	? REACT_APP_CLIENT_ID
	: REACT_APP_CLIENT_ID_PROD

const env_required: { [key: string]: string | undefined } = {
	API_URL,
	CLIENT_ID,
}

const checkEnv = () => {
	Object.keys(env_required).forEach((key) => {
		const value = env_required[key]
		if (!value) {
			console.error(
				`Please set the env var: ${key} in .env for development and in your development server for production/staging`
			)
		}
	})
}

checkEnv()
