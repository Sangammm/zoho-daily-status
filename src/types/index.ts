import * as React from 'react';
import { Moment } from 'moment';

export interface globalStoreI {
	store: globalStoreValuesI
	setStore: React.Dispatch<React.SetStateAction<globalStoreValuesI>>
}

export interface globalStoreValuesI {
	accessToken: string
	refreshToken: string
	expires: null | string | Moment
}