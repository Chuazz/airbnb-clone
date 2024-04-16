import { Flex } from '@chakra-ui/react';
import { SwitchType } from '@type/ui/switch-ui';
import { motion } from 'framer-motion';
import { ReactIcon } from './react-icon';

const Switch = ({ width = 50, value, onChange }: SwitchType) => {
	const height = Math.ceil(width / 1.5);
	const iconContainerSize = height - 3;

	return (
		<Flex
			as={motion.div}
			borderRadius='full'
			cursor='pointer'
			alignItems='center'
			width={width}
			height={height}
			initial={{
				backgroundColor: 'var(--chakra-colors-gray-300)',
			}}
			animate={{
				backgroundColor: value ? 'var(--chakra-colors-gray-900)' : 'var(--chakra-colors-gray-300)',
			}}
			onClick={onChange}
		>
			<Flex
				as={motion.div}
				alignItems='center'
				justifyContent='center'
				backgroundColor='white'
				borderRadius='full'
				width={iconContainerSize}
				height={iconContainerSize}
				transition='all 0.1s linear'
				initial={{
					translateX: 2,
				}}
				animate={{
					translateX: value ? height / 1.92 : 2,
				}}
			>
				{value && (
					<ReactIcon
						icon='io-checkmark'
						boxSize={`${Math.ceil(height / 2)}px`}
					/>
				)}
			</Flex>
		</Flex>
	);
};

export { Switch };
