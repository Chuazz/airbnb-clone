import { modal } from '@config/modal-config';

type ModalSliceType = {
	show?: boolean;
	active?: keyof typeof modal;
};

export type { ModalSliceType };
