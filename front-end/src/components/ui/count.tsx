import { Center, HStack, Text } from '@chakra-ui/react';
import { CountType } from '@type/ui/count-ui';
import { ReactIcon } from './react-icon';

const Count = ({ value, onChange, max, min = 0 }: CountType) => {
	const allowDecrease = value > min;
	const allowIncrease = max ? value < value : true;

	return (
		<HStack>
			<Center
				height={8}
				width={8}
				borderRadius='full'
				border='1px'
				borderColor='gray.300'
				cursor={allowDecrease ? 'pointer' : 'not-allowed'}
				_hover={{
					borderColor: allowDecrease ? 'gray.800' : 'gray.300',
				}}
				onClick={() => {
					if (allowDecrease) {
						onChange?.(value - 1);
					}
				}}
			>
				<ReactIcon
					icon='hi-outline-minus'
					color='gray.300'
				/>
			</Center>

			<Text
				width={4}
				textAlign='center'
			>
				{value}
			</Text>

			<Center
				height={8}
				width={8}
				borderRadius='full'
				border='1px'
				borderColor='gray.300'
				cursor={allowIncrease ? 'pointer' : 'not-allowed'}
				_hover={{
					borderColor: allowIncrease ? 'gray.800' : 'gray.300',
				}}
				onClick={() => {
					if (allowIncrease) {
						onChange?.(value + 1);
					}
				}}
			>
				<ReactIcon
					icon='hi-outline-plus'
					color='gray.600'
				/>
			</Center>
		</HStack>
	);
};

export { Count };
