import { Box } from '@chakra-ui/react';
import { Overlay } from '@component/overlay';
import { UserActionOverlay } from '@component/layout/header/overlay/user-action-overlay';
import { ReactIcon } from '@component/ui/react-icon';
import { UserAvatar } from '@component/ui/user-avatar';

const UserAction = () => {
	return (
		<Overlay
			content={<UserActionOverlay />}
			popoverProps={{
				placement: 'bottom-end',
			}}
		>
			<Box
				display='flex'
				alignItems='center'
				gap={3}
				borderRadius={9999}
				pl={3}
				pr={2}
				py={2}
				border='1px'
				borderColor='gray.200'
				cursor='pointer'
				_hover={{
					boxShadow: 'header',
				}}
			>
				<ReactIcon
					icon='fa-bars'
					color='var(--surface-900)'
					boxSize={4}
				/>

				<UserAvatar />
			</Box>
		</Overlay>
	);
};

export { UserAction };
