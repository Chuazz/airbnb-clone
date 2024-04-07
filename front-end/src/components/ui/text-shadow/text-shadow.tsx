import { TextShadowType } from '@type/ui/text-shadow-ui';

import styles from './text-shadow.module.scss';

const TextShadow = ({ children, ...props }: TextShadowType) => {
	return (
		<p
			className={styles['text-shadow']}
			data-content={children}
			{...props}
		>
			{children}
		</p>
	);
};

export { TextShadow };
