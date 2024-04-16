import { Box, useEventListener } from '@chakra-ui/react';
import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { motion } from 'framer-motion';
import { ActiveTab } from './tab/active-tab';
import { InactiveTab } from './tab/inactive-tab';

const SearchBar = () => {
	const visible = useSelector((state) => state.searchBar.visible);
	const dispatch = useDispatch();

	useEventListener('scroll', () => {
		if (window.scrollY > 0) {
			dispatch(searchBarSlice.actions.setVisible(false));
		} else {
			dispatch(searchBarSlice.actions.setVisible(true));
		}
	});

	return (
		<>
			<Box
				as={motion.div}
				position='fixed'
				zIndex='docked'
				left='50%'
				width={850}
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
			</Box>

			<Box
				as={motion.div}
				position='fixed'
				backgroundColor='white'
				zIndex='docked'
				left='50%'
				initial={{
					opacity: 0,
					transform: 'translate(-50%, -20px) scale(0.3)',
					transformOrigin: 'top center',
				}}
				animate={{
					transform: visible ? 'translate(-50%, -20px) scale(0.3)' : 'translate(-50%, 0) scale(1)',
					opacity: visible ? 0 : 1,
				}}
			>
				<InactiveTab />
			</Box>
		</>
	);
};

export { SearchBar };
