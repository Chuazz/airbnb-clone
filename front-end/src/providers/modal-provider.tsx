import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { modalConfig } from '@config/modal-config';
import { modalSlice } from '@redux/slices/modal-slice';
import { useDispatch, useSelector } from '@redux/store';
import { CustomDialogProps, ModalContextType, OpenModalType } from '@type/context/modal-context';
import classNames from 'classnames';
import { createContext, PropsWithChildren, useState } from 'react';

const ModalContext = createContext<ModalContextType>({
	close() {},
	open() {},
});
const ModalProvider = ({ children }: PropsWithChildren) => {
	const { show, active } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const ModalBody = active ? modalConfig[active] : () => <></>;
	const [props, setProps] = useState<{ modalProps?: any; dialogProps?: CustomDialogProps }>();

	const close = () => {
		dispatch(modalSlice.actions.close());
	};

	const open = ({ name, dialogProps, modalProps }: OpenModalType) => {
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

			<Modal
				isOpen={show}
				onClose={() => {
					dispatch(modalSlice.actions.close());
				}}
			>
				<ModalOverlay />

				<ModalContent>
					<div
						className={classNames(
							'bg-white shadow-3 border-round-2xl overflow-hidden',
							props?.dialogProps?.className,
						)}
						style={props?.dialogProps?.style}
					>
						<ModalBody
							{...props?.modalProps}
							onClose={() => {
								props?.modalProps?.onClose?.();

								close();
							}}
						/>
					</div>
				</ModalContent>
			</Modal>

			{/* <Dialog
				{...props?.dialogProps}
				visible={show}
				className='shadow-none'
				content={
					<div
						className={classNames(
							'bg-white shadow-3 border-round-2xl overflow-hidden',
							props?.dialogProps?.className,
						)}
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
			/> */}
		</ModalContext.Provider>
	);
};

export { ModalContext, ModalProvider };
