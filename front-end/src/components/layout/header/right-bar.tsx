import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from '@hook/use-translation';
import { ChangeLanguage } from './modal/change-language';
import { UserAction } from './modal/user-action';

const RightBar = () => {
	const { t } = useTranslation();

	return (
		<Flex
			alignItems='center'
			gap={2}
			backgroundColor='white'
		>
			<Box
				px={4}
				py={2}
				borderRadius={9999}
				display='flex'
				alignItems='center'
				justifyContent='center'
				cursor='pointer'
				_hover={{
					background: 'gray.100',
				}}
			>
				<Text
					color='gray.900'
					fontWeight={600}
				>
					{t('menu:airbnb_your_home')}
				</Text>
			</Box>

			<ChangeLanguage />

			<UserAction />
		</Flex>
	);
};

export { RightBar };
