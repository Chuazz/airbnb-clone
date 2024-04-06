import LogoSvg from '@asset/svg/svg-logo.svg';
import { SearchBar } from './search-bar';
import { RightBar } from './right-bar';

const Header = () => {
	return (
		<div
			className='flex align-items-center'
			style={{ height: 80 }}
		>
			<div className='text-red-500'>
				<LogoSvg />
			</div>

			<SearchBar />

			<RightBar />
		</div>
	);
};

export { Header };
