import { ModalType } from './modal-type';

type ConfirmModalType = ModalType & {
	onAgree?: () => void;
	onCancel?: () => void;
};

export type { ConfirmModalType };
