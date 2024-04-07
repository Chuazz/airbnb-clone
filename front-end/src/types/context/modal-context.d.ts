import { modal } from '@config/modal-config';
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

type OpenPropType<MP = any> = {
	name: keyof typeof modal;
	modalProps?: MP;
	dialogProps?: CustomDialogProps;
};

type ModalContextType = {
	open: <MP = any>(_data: OpenPropType<MP>) => void;
	close: () => void;
};

export type { ModalContextType, CustomDialogProps, OpenPropType };
