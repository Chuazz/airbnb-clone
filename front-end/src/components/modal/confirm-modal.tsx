import { ConfirmModalType } from '@type/modal/confirm-modal';
import { Button } from 'primereact/button';

const ConfirmModal = ({ onClose, onAgree, onCancel }: ConfirmModalType) => {
	return (
		<div className='flex flex-column gap-4'>
			<p className='font-semibold text-lg'>Do you want to log out now ?</p>

			<div className='flex gap-2'>
				<Button
					className='flex-1'
					label='not now'
					severity='secondary'
					onClick={() => {
						onClose?.();
						onCancel?.();
					}}
				/>

				<Button
					className='flex-1'
					label='very sure'
					onClick={() => {
						onClose?.();
						onAgree?.();
					}}
				/>
			</div>
		</div>
	);
};

export { ConfirmModal };
