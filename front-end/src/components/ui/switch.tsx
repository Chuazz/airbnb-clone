import { SwitchType } from '@type/ui/switch-type';
import { motion } from 'framer-motion';
import { ReactIcon } from './react-icon';

const Switch = ({ width = 50, value, onChange }: SwitchType) => {
	const height = Math.ceil(width / 1.5);
	const iconContainerSize = height - 3;

	return (
		<motion.div
			className='border-rounded cursor-pointer flex align-items-center'
			style={{ width, height }}
			initial={{
				backgroundColor: 'var(--surface-300)',
			}}
			animate={{
				backgroundColor: value ? 'var(--surface-900)' : 'var(--surface-300)',
			}}
			onClick={onChange}
		>
			<motion.div
				className='flex align-items-center justify-content-center bg-white border-circle'
				style={{ width: iconContainerSize, height: iconContainerSize }}
				transition={{ type: 'tween' }}
				initial={{
					translateX: 2,
				}}
				animate={{
					translateX: value ? height / 2 : 2,
				}}
			>
				{value && (
					<ReactIcon
						icon='io-checkmark'
						size={Math.ceil(height / 2)}
					/>
				)}
			</motion.div>
		</motion.div>
	);
};

export { Switch };
