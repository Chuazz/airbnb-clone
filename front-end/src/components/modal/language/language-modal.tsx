import { ReactIcon } from '@component/ui/react-icon';
import { useTranslation } from '@hook/use-translation';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Currency } from './components/currency';
import { Region } from './components/region';
import { useModal } from '@hook/use-modal';
import { Box, Center, Flex, HStack, Text } from '@chakra-ui/react';

const LanguageModal = () => {
	const { t } = useTranslation();
	const [active, setActive] = useState('region');
	const { onClose } = useModal();

	const tabs: OptionType[] = [
		{
			code: 'region',
			label: t('menu:language_region'),
		},

		{
			code: 'currency',
			label: t('menu:currency'),
		},
	];

	return (
		<Box
			backgroundColor='white'
			pl={6}
			pb={6}
			borderRadius='xl'
		>
			<Flex
				height={14}
				alignItems='center'
			>
				<Center
					height={8}
					width={8}
					ml={-3}
					borderRadius='full'
					cursor='pointer'
					_hover={{
						backgroundColor: 'gray.100',
					}}
					onClick={onClose}
				>
					<ReactIcon
						icon='ih-mini-x-mark'
						boxSize='20px'
					/>
				</Center>
			</Flex>

			<Flex
				overflow='auto'
				flexDirection='column'
				gap={6}
				pr={6}
				maxHeight='calc(100vh - 190px)'
			>
				<HStack
					borderBottom='1px'
					borderColor='gray.200'
					spacing={3}
				>
					{tabs.map((tab) => (
						<Box key={tab.code}>
							<Box
								p={2}
								mb={1}
								borderRadius='base'
								cursor='pointer'
								_hover={{
									backgroundColor: 'gray.100',
								}}
								onClick={() => {
									setActive(tab.code);
								}}
							>
								<Text fontWeight='semibold'>{tab.label}</Text>
							</Box>

							<Box
								as={motion.div}
								height={0.5}
								borderRadius='full'
								backgroundColor={tab.code === active ? 'gray.700' : 'transparent'}
							/>
						</Box>
					))}
				</HStack>

				{active === 'region' && <Region />}

				{active === 'currency' && <Currency />}
			</Flex>
		</Box>
	);
};

export { LanguageModal };
