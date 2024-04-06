'use client';

import { classNames } from 'primereact/utils';
import styles from './loading.module.css';

type LoadingProps = {
	show?: boolean;
	size?: number;
	lineSize?: number;
};

const Loading = ({ size = 64, show = true, lineSize = 5 }: LoadingProps) => {
	return (
		show && (
			<div className='bg-black-alpha-70 absolute top-0 left-0 right-0 bottom-0 z-5'>
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
			</div>
		)
	);
};

export { Loading };
