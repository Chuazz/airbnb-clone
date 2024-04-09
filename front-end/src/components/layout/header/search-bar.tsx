import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { useEventListener } from 'primereact/hooks';
import { useEffect } from 'react';
import { ActiveTab } from './components/active-tab';
import { InactiveTab } from './components/inactive-tab';
import { motion } from 'framer-motion';

const SearchBar = () => {
	const visible = useSelector((state) => state.searchBar.visible);
	const dispatch = useDispatch();

	const [bindScroll, unbindScroll] = useEventListener({
		type: 'scroll',
		listener() {
			if (window.scrollY > 0) {
				dispatch(searchBarSlice.actions.setVisible(false));
			} else {
				dispatch(searchBarSlice.actions.setVisible(true));
			}
		},
	});

	useEffect(() => {
		bindScroll();

		return () => {
			unbindScroll();
		};
	}, [bindScroll, unbindScroll]);

	return (
		<>
			<motion.div
				className='fixed left-50'
				style={{
					width: 850,
				}}
				initial={{
					opacity: 1,
					transform: 'translate(-50%, 0) scale(1)',
					transformOrigin: 'top center',
				}}
				animate={{
					transform: visible ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, -20px) scale(0.3)',
					opacity: visible ? 1 : 0,
				}}
			>
				<ActiveTab />
			</motion.div>

			<motion.div
				className='fixed left-50'
				initial={{
					opacity: 1,
					transform: 'translate(-50%, 0) scale(1)',
					transformOrigin: 'top center',
				}}
				animate={{
					transform: !visible ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, -20px) scale(0.3)',
					opacity: !visible ? 1 : 0,
				}}
			>
				<InactiveTab />
			</motion.div>
		</>
	);
};

export { SearchBar };
