import { Box } from '@chakra-ui/react';
import { Modal } from '@component/modal';
import { LanguageModal } from '@component/modal/language/language-modal';
import { ReactIcon } from '@component/ui/react-icon';

const ChangeLanguage = () => {
	return (
		<Modal
			blockScrollOnMount={true}
			scrollBehavior='inside'
			content={<LanguageModal />}
			size='6xl'
		>
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
			>
				<ReactIcon
					icon='ri-global-line'
					boxSize='22px'
					color='gray.900'
				/>
			</Box>
		</Modal>
	);
};

export { ChangeLanguage };
