'use client';

import classNames from 'classnames';
import styles from './loading.module.css';
import { Box } from '@chakra-ui/react';

type LoadingProps = {
	show?: boolean;
	size?: number;
	lineSize?: number;
};

const Loading = ({ size = 64, show = true, lineSize = 5 }: LoadingProps) => {
	return (
		show && (
			<Box
				backgroundColor='blackAlpha.500'
				position='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				zIndex={9999}
			>
				<div
					className={classNames(styles.loader)}
					style={{ width: size, height: size }}
				>
					<div
						className={classNames(styles.inner, styles.one)}
						style={{ borderBottom: `${lineSize}px solid #efeffa` }}
					/>
					<div
						className={classNames(styles.inner, styles.two)}
						style={{ borderRight: `${lineSize}px solid #efeffa` }}
					/>
					<div
						className={classNames(styles.inner, styles.three)}
						style={{ borderTop: `${lineSize}px solid #efeffa` }}
					/>
				</div>
			</Box>
		)
	);
};

export { Loading };
