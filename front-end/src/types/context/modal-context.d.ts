import { modalConfig } from '@config/modal-config';
import { DialogProps } from 'primereact/dialog';

interface CustomDialogProps
	extends Omit<
		DialogProps,
		| 'onHide'
		| 'footer'
		| 'header'
		| 'headerClassName'
		| 'headerStyle'
		| 'showHeader'
		| 'content'
		| 'contentClassName'
		| 'contentStyle'
		| 'closeIcon'
	> {
	onHide?: () => void;
}

type OpenModalType<MP = any> = {
	name: keyof typeof modalConfig;
	modalProps?: MP;
	dialogProps?: CustomDialogProps;
};

type ModalContextType = {
	open: (_data: OpenModalType) => void;
	close: () => void;
};

export type { ModalContextType, CustomDialogProps, OpenModalType };
