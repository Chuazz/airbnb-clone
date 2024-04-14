import LogoSvg from '@asset/svg/svg-logo.svg';
import { Box } from '@chakra-ui/react';
import { useSelector } from '@redux/store';
import { RightBar } from './right-bar';
import { SearchBar } from './search-bar';
import { motion } from 'framer-motion';

const Header = () => {
	const visible = useSelector((state) => state.searchBar.visible);

	return (
		<Box
			as={motion.div}
			display='flex'
			justifyContent='space-between'
			boxShadow='header'
			position='fixed'
			top={0}
			left={0}
			right={0}
			className='app-padding'
			initial={{
				height: 168,
				alignItems: 'flex-start',
				paddingTop: 16,
			}}
			animate={{
				height: visible ? 168 : 80,
				alignItems: visible ? 'flex-start' : 'center',
				paddingTop: visible ? 16 : 0,
			}}
		>
			<Box
				style={{
					color: 'var(--primary)',
					paddingTop: visible ? 8 : 0,
				}}
			>
				<LogoSvg />
			</Box>

			<SearchBar />

			<RightBar />
		</Box>
	);
};

export { Header };
