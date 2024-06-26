import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { SliderCalendar } from '@component/ui/slider-calendar/slider-calendar';
import { useTranslation } from '@hook/use-translation';
import { OptionType } from '@type/option';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateOverlay = () => {
	const [value, onChange] = useState<Value>(new Date());
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState('dates');

	const tabs: OptionType[] = [
		{
			code: 'dates',
			label: t('common:dates'),
		},
		{
			code: 'months',
			label: t('common:months'),
		},
		{
			code: 'flexible',
			label: t('common:flexible'),
		},
	];

	const extraDates: OptionType[] = [
		{
			code: 'extract_dates',
			label: t('common:extract_dates'),
		},
		{
			code: '+-1day',
			label: t('common:+-1day'),
		},
		{
			code: '+-2days',
			label: t('common:+-2days'),
		},
		{
			code: '+-3days',
			label: t('common:+-3days'),
		},
		{
			code: '+-7days',
			label: t('common:+-7days'),
		},
		{
			code: '+-14days',
			label: t('common:+-14days'),
		},
	];

	return (
		<VStack
			backgroundColor='white'
			boxShadow='header'
			py={8}
			px='64px'
			width='850px'
			maxHeight='calc(100vh - 170px)'
			overflow='auto'
			borderRadius='5xl'
			spacing={6}
			align='flex-start'
		>
			<Flex
				alignItems='center'
				gap={1}
				p='3px'
				borderRadius='full'
				backgroundColor='white.700'
				width='fit-content'
				mx='auto'
			>
				{tabs.map((tab) => (
					<Box
						key={tab.code}
						px={8}
						py={2}
						backgroundColor={tab.code === activeTab ? 'white' : 'transparent'}
						borderRadius='full'
						border='1px'
						cursor={tab.code === activeTab ? 'default' : 'pointer'}
						borderColor={tab.code === activeTab ? 'gray.200' : 'transparent'}
						_hover={{
							backgroundColor: tab.code === activeTab ? 'white' : 'white.800',
						}}
						onClick={() => setActiveTab(tab.code)}
					>
						<Text fontWeight='semibold'>{tab.label}</Text>
					</Box>
				))}
			</Flex>

			<Box
				position='relative'
				w='100%'
			>
				<SliderCalendar />
			</Box>

			<Flex
				alignItems='center'
				justifyContent='flex-start'
				w='100%'
				gap={3}
				p={1}
				borderRadius='full'
				width='fit-content'
			>
				{extraDates.map((extraDate) => (
					<Box
						key={extraDate.code}
						px={6}
						py={2}
						borderRadius='full'
						border='1px'
						cursor='pointer'
						borderColor='gray.200'
						_hover={{
							borderColor: 'gray.900',
						}}
						onClick={() => setActiveTab(extraDate.code)}
					>
						<Text fontSize='sm'>{extraDate.label}</Text>
					</Box>
				))}
			</Flex>
		</VStack>
	);
};

export { DateOverlay };
