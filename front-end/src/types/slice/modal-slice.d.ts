import { modalConfig } from '@config/modal-config';

type ModalSliceType = {
	show?: boolean;
	active?: keyof typeof modalConfig;
};

export type { ModalSliceType };
