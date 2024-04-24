import { Flex, Grid, Text } from '@chakra-ui/react';
import { useTranslation } from '@hook/use-translation';

const Weeks = () => {
	const { t } = useTranslation();
	const days = ['mo', 'tu', 'we', 'th', 'fri', 'sa', 'su'];

	return (
		<Flex
			position='absolute'
			top={12}
			width='100%'
			justifyContent='space-between'
		>
			<Grid gridTemplateColumns='repeat(7, 46px)'>
				{days.map((day) => (
					<Text
						key={day}
						textAlign='center'
						fontWeight='semibold'
						color='gray.600'
					>
						{t(`common:${day}`)}
					</Text>
				))}
			</Grid>

			<Grid gridTemplateColumns='repeat(7, 46px)'>
				{days.map((day) => (
					<Text
						key={day}
						textAlign='center'
						fontWeight='semibold'
						color='gray.600'
					>
						{t(`common:${day}`)}
					</Text>
				))}
			</Grid>
		</Flex>
	);
};

export { Weeks };
