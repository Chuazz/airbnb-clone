import LogoSvg from '@asset/svg/svg-logo.svg';
import { useSelector } from '@redux/store';
import { motion } from 'framer-motion';
import { RightBar } from './right-bar';
import { SearchBar } from './search-bar';

const Header = () => {
	const visible = useSelector((state) => state.searchBar.visible);

	return (
		<motion.div
			className='flex justify-content-between shadow-1 app-padding fixed top-0 left-0 right-0'
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
			<div
				className='align-content-start'
				style={{
					color: 'var(--primary)',
					paddingTop: visible ? 8 : 0,
				}}
			>
				<LogoSvg />
			</div>

			<SearchBar />

			<RightBar />
		</motion.div>
	);
};

export { Header };
