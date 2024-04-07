import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';
import { SearchBarSliceType } from '@type/slice/search-bar-slice';

const initialState: SearchBarSliceType = {
	visible: true,
	parentActive: 'stays',
	childrenActive: 'where',
};

const searchBarSlice = createSlice({
	name: 'search-bar',
	initialState,
	reducers: {
		setParentActive(state, action: PayloadAction<HeaderParentTabType>) {
			state.parentActive = action.payload;
		},
		setChildrenActive(state, action: PayloadAction<HeaderChildrenTabType>) {
			state.childrenActive = action.payload;
		},
		setVisible(state, action: PayloadAction<boolean>) {
			state.visible = action.payload;
		},
	},
});

export { searchBarSlice };
