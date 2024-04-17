import { Box, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { Count } from '@component/ui/count';
import { useTranslation } from '@hook/use-translation';

const GuestOverlay = () => {
	const { t } = useTranslation();

	return (
		<VStack
			backgroundColor='white'
			boxShadow='header'
			p={8}
			spacing={4}
			width='md'
			borderRadius='5xl'
			align='flex-start'
			divider={<Divider />}
		>
			<Flex
				alignItems='center'
				w='100%'
			>
				<Box flex={1}>
					<Text fontWeight='semibold'>{t('common:adult')}</Text>

					<Text color='gray.500'>{t('common:from_13_above')}</Text>
				</Box>

				<Count
					value={0}
					onChange={(value) => {
						console.log('🚀 ~ GuestOverlay ~ value:', value);
					}}
				/>
			</Flex>

			<Flex
				alignItems='center'
				w='100%'
			>
				<Box flex={1}>
					<Text fontWeight='semibold'>{t('common:adult')}</Text>

					<Text color='gray.500'>{t('common:from_13_above')}</Text>
				</Box>

				<Count
					value={0}
					onChange={(value) => {
						console.log('🚀 ~ GuestOverlay ~ value:', value);
					}}
				/>
			</Flex>

			<Flex
				alignItems='center'
				w='100%'
			>
				<Box flex={1}>
					<Text fontWeight='semibold'>{t('common:adult')}</Text>

					<Text color='gray.500'>{t('common:ages_13_or_above')}</Text>
				</Box>

				<Count
					value={0}
					onChange={(value) => {
						console.log('🚀 ~ GuestOverlay ~ value:', value);
					}}
				/>
			</Flex>

			<Flex
				alignItems='center'
				w='100%'
			>
				<Box flex={1}>
					<Text fontWeight='semibold'>{t('common:adult')}</Text>

					<Text
						color='gray.700'
						textDecoration='underline'
						cursor='pointer'
					>
						{t('common:bring_a_service_animal')}
					</Text>
				</Box>

				<Count
					value={0}
					onChange={(value) => {
						console.log('🚀 ~ GuestOverlay ~ value:', value);
					}}
				/>
			</Flex>
		</VStack>
	);
};

export { GuestOverlay };
