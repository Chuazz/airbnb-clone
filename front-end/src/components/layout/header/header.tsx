import LogoSvg from '@asset/svg/svg-logo.svg';
import { SearchBar } from './search-bar';
import { RightBar } from './right-bar';

const Header = () => {
	return (
		<div
			className='flex align-items-center justify-content-between shadow-1 app-padding'
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
