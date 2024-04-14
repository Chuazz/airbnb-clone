import { Button } from '@chakra-ui/react';
import { ConfirmModalType } from '@type/modal/confirm-modal';

const ConfirmModal = ({ onClose, onAgree, onCancel }: ConfirmModalType) => {
	return (
		<div className='flex flex-column gap-4'>
			<p className='font-semibold text-lg'>Do you want to log out now ?</p>

			<div className='flex gap-2'>
				<Button
					className='flex-1'
					onClick={() => {
						onClose?.();
						onCancel?.();
					}}
				>
					not now
				</Button>

				<Button
					className='flex-1'
					onClick={() => {
						onClose?.();
						onAgree?.();
					}}
				>
					very sure
				</Button>
			</div>
		</div>
	);
};

export { ConfirmModal };
