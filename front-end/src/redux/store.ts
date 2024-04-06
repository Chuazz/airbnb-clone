import { reduxMiddlewares } from '@middleware/redux';
import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import { modalSlice } from './slices/modal-slice';
import { searchBarSlice } from './slices/search-bar-slice';
import { appSlice } from './slices/app-slice';

const reducer = {
	modal: modalSlice.reducer,
	searchBar: searchBarSlice.reducer,
	app: appSlice.reducer,
};

export const reduxStore = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(reduxMiddlewares);
	},
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>;
