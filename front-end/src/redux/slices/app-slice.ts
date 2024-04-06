import { route } from '@config/routes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSliceType } from '@type/slice/app-slice-type';

const initialState: AppSliceType = {
	page: 'root',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<keyof typeof route>) {
			state.page = action.payload;
		},
	},
});

export { appSlice };
