import { Icon, IconProps } from '@chakra-ui/react';
import { iconConfig } from '@config/icon-config';

type ReactIconProps = IconProps & {
	icon: keyof typeof iconConfig;
};

const ReactIcon = ({ icon, ...props }: ReactIconProps) => {
	return (
		<Icon
			as={iconConfig[icon]}
			{...props}
		/>
	);
};

export { ReactIcon };
