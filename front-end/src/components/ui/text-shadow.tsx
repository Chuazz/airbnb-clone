import { Text, TextProps } from '@chakra-ui/react';

const TextShadow = ({ children, ...props }: TextProps) => {
	return (
		<Text
			_after={{
				display: 'block',
				fontWeight: props.fontWeight,
				height: '1px',
				color: 'transparent',
				overflow: 'hidden',
				visibility: 'hidden',
			}}
			{...props}
		>
			{children}
		</Text>
	);
};

export { TextShadow };
