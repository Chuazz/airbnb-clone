import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderTabType } from '@type/common-type';
import { SearchBarSliceType } from '@type/slice/search-bar-slice-type';

const initialState: SearchBarSliceType = {
	visible: true,
	active: 'stays',
};

const searchBarSlice = createSlice({
	name: 'search-bar',
	initialState,
	reducers: {
		setActive(state, action: PayloadAction<HeaderTabType>) {
			state.active = action.payload;
		},
		setVisible(state, action: PayloadAction<boolean>) {
			state.visible = action.payload;
		},
	},
});

export { searchBarSlice };
