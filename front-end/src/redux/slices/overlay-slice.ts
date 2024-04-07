import { overlayConfig } from '@config/overlay-config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OverlaySliceType } from '@type/slice/overlay-slice';

const initialState: OverlaySliceType = {
	active: undefined,
};

const overlaySlice = createSlice({
	name: 'overlay',
	initialState,
	reducers: {
		open: (state, action: PayloadAction<keyof typeof overlayConfig>) => {
			state.active = action.payload;
		},
		close: (state) => {
			state.active = undefined;
		},
	},
});

export { overlaySlice };
