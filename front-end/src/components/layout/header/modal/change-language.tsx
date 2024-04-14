import { Box } from '@chakra-ui/react';
import { ReactIcon } from '@component/ui/react-icon';
import { useModal } from '@hook/use-modal';

const ChangeLanguage = () => {
	const { open } = useModal();

	const onLanguageClick = () => {
		open({
			name: 'language',
			modalProps: {},
			dialogProps: {
				style: {
					width: '70vw',
				},
			},
		});
	};

	return (
		<Box
			width={10}
			height={10}
			borderRadius={9999}
			display='flex'
			alignItems='center'
			justifyContent='center'
			cursor='pointer'
			_hover={{
				background: 'gray.100',
			}}
			onClick={onLanguageClick}
		>
			<ReactIcon
				icon='ri-global-line'
				size={20}
				color='var(--surface-900)'
			/>
		</Box>
	);
};

export { ChangeLanguage };
