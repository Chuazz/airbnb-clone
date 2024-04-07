import { ReactIcon } from '@component/ui/react-icon';
import { UserAvatar } from '@component/ui/user-avatar';
import { useOverlay } from '@hook/use-overlay';
import { motion } from 'framer-motion';

const UserAction = () => {
	const { open } = useOverlay();

	return (
		<div>
			<motion.div
				className='flex align-items-center gap-3 border-rounded pl-3 pr-2 py-2 border-1 border-200 cursor-pointer'
				initial={{
					boxShadow: 'none',
				}}
				whileHover={{
					boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
				}}
				onClick={(e) => {
					open({
						name: 'user-action',
						target: e,
					});
				}}
			>
				<ReactIcon
					icon='fa-bars'
					color='var(--surface-900)'
					size={16}
				/>

				<UserAvatar />
			</motion.div>
		</div>
	);
};

export { UserAction };
