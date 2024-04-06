import { iconConfig } from '@config/icon-config';
import { IconBaseProps } from 'react-icons/lib';

type ReactIconProps = IconBaseProps & {
	icon: keyof typeof iconConfig;
};

const ReactIcon = ({ icon, ...props }: ReactIconProps) => {
	const Icon = iconConfig[icon];

	return <Icon {...props} />;
};

export { ReactIcon };
