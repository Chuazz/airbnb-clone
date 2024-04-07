import { ChangeLanguage } from './components/change-language';
import { UserAction } from './components/user-action';

const RightBar = () => {
	return (
		<div className='flex align-items-center gap-4'>
			<ChangeLanguage />

			<UserAction />
		</div>
	);
};

export { RightBar };
