import { ModalType } from './modal';

type ConfirmModalType = ModalType & {
	onAgree?: () => void;
	onCancel?: () => void;
};

export type { ConfirmModalType };
