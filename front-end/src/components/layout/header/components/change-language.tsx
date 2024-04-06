import { ReactIcon } from '@component/ui/react-icon';
import { useModal } from '@hook/use-modal';

const ChangeLanguage = () => {
	const { open } = useModal();

	const onLanguageClick = () => {
		open({
			name: 'language',
			dialogProps: {
				style: {
					width: '70vw',
				},
			},
		});
	};

	return (
		<div
			className='w-3rem h-3rem border-circle flex align-items-center justify-content-center cursor-pointer hover:surface-100'
			onClick={onLanguageClick}
		>
			<ReactIcon
				icon='ri-global-line'
				size={20}
			/>
		</div>
	);
};

export { ChangeLanguage };
