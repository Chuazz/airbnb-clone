import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';
import { SearchBarSliceType } from '@type/slice/search-bar-slice';

const initialState: SearchBarSliceType = {
	visible: true,
	searching: false,
	parentActive: 'stays',
	childrenActive: undefined,
	params: {
		address: '',
		guests: {
			adult: 0,
			children: 0,
			pet: 0,
		},
	},
};

const searchBarSlice = createSlice({
	name: 'search-bar',
	initialState,
	reducers: {
		setParentActive(state, action: PayloadAction<HeaderParentTabType>) {
			state.parentActive = action.payload;
		},
		setChildrenActive(state, action: PayloadAction<HeaderChildrenTabType | undefined>) {
			state.childrenActive = action.payload;
		},
		setVisible(state, action: PayloadAction<boolean>) {
			state.visible = action.payload;
		},
		setSearching(state, action: PayloadAction<boolean>) {
			state.searching = action.payload;
		},
	},
});

export { searchBarSlice };
