import { modal } from '@config/modal-config';
import { modalSlice } from '@redux/slices/modal';
import { useSelector } from '@redux/store';
import { CustomDialogProps, ModalContextType, OpenPropType } from '@type/context/modal-context-type';
import { ModalProviderType } from '@type/provider/modal-provider-type';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';

const ModalContext = createContext<ModalContextType>({
	close() {},
	open() {},
});

const ModalProvider = ({ children }: ModalProviderType) => {
	const { show, active } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const [props, setProps] = useState<{ modalProps?: any; dialogProps?: CustomDialogProps }>();
	const DialogContent = active ? modal[active] : () => <></>;

	const close = () => {
		dispatch(modalSlice.actions.close());
	};

	const open = ({ name, dialogProps, modalProps }: OpenPropType) => {
		dispatch(modalSlice.actions.open(name));

		setProps({
			modalProps,
			dialogProps,
		});
	};

	const value: ModalContextType = {
		close,
		open,
	};

	return (
		<ModalContext.Provider value={value}>
			{children}

			<Dialog
				{...props?.dialogProps}
				visible={show}
				className='shadow-none'
				content={
					<div
						className={classNames('p-4 bg-white shadow-3 border-round-2xl', props?.dialogProps?.className)}
						style={props?.dialogProps?.style}
					>
						<DialogContent
							{...props?.modalProps}
							onClose={() => {
								props?.modalProps?.onClose?.();

								close();
							}}
						/>
					</div>
				}
				onHide={() => {
					props?.dialogProps?.onHide?.();

					dispatch(modalSlice.actions.close());
				}}
			/>
		</ModalContext.Provider>
	);
};

export { ModalContext, ModalProvider };
