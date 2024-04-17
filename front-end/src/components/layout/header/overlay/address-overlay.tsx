import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import { Image } from '@component/ui/image';
import { imageConfig } from '@config/image-config';
import { useTranslation } from '@hook/use-translation';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';

const AddressOverlay = () => {
	const { t } = useTranslation();

	const regions: OptionType<keyof typeof imageConfig>[] = [
		{
			code: 'flexible-image',
			label: t('common:flexible'),
		},
		{
			code: 'europe-image',
			label: t('common:europe'),
		},
		{
			code: 'thailand-image',
			label: t('common:thailands'),
		},
		{
			code: 'australia-image',
			label: t('common:australia'),
		},
		{
			code: 'south-korea-image',
			label: t('common:south_korea'),
		},
		{
			code: 'united-state-image',
			label: t('common:united_state'),
		},
	];

	return (
		<VStack
			backgroundColor='white'
			boxShadow='header'
			p={8}
			spacing={4}
			width='md'
			borderRadius='5xl'
			align='flex-start'
		>
			<Text
				color='gray.900'
				fontSize='lg'
				fontWeight='semibold'
			>
				{t('search_by_region')}
			</Text>

			<Grid
				templateColumns='repeat(3, 1fr)'
				rowGap={3}
				mx={-2}
			>
				{regions.map((region) => (
					<VStack
						key={region.code}
						align='flex-start'
						spacing={1}
						borderRadius='md'
						p={2}
						_hover={{
							backgroundColor: 'blackAlpha.200',
						}}
					>
						<Box
							as={motion.div}
							initial={{ transform: 'scale(1)' }}
							whileTap={{
								transform: 'scale(0.9)',
							}}
						>
							<Image
								src={region.code}
								alt={region.label}
								borderRadius='lg'
								border='1px'
								borderColor='gray.300'
								cursor='pointer'
							/>
						</Box>

						<Text>{region.label}</Text>
					</VStack>
				))}
			</Grid>
		</VStack>
	);
};

export { AddressOverlay };
