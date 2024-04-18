import LogoSvg from '@asset/svg/svg-logo.svg';
import { Box } from '@chakra-ui/react';
import { useSelector } from '@redux/store';
import { motion } from 'framer-motion';
import { RightBar } from './right-bar';
import { SearchBar } from './search-bar';

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
				height: 150,
				alignItems: 'flex-start',
				paddingTop: 16,
			}}
			animate={{
				height: visible ? 150 : 80,
				alignItems: visible ? 'flex-start' : 'center',
				paddingTop: visible ? 16 : 0,
			}}
		>
			<Box color='primary.900'>
				<LogoSvg />
			</Box>

			<SearchBar />

			<RightBar />
		</Box>
	);
};

export { Header };
