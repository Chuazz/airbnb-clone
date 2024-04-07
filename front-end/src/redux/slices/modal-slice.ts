import { modalConfig } from '@config/modal-config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalSliceType } from '@type/slice/modal-slice';

const initialState: ModalSliceType = {
	show: false,
	active: undefined,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		open(state, action: PayloadAction<keyof typeof modalConfig>) {
			state.active = action.payload;
			state.show = true;
		},
		close(state) {
			state.active = undefined;
			state.show = false;
		},
	},
});

export { modalSlice };
