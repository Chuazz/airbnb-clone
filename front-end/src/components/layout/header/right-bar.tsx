import { useTranslation } from '@hook/use-translation';
import { ChangeLanguage } from './modal/change-language';
import { UserAction } from './modal/user-action';
import { motion } from 'framer-motion';

const RightBar = () => {
	const { t } = useTranslation();

	return (
		<div className='flex align-items-center gap-2'>
			<motion.div
				className='cursor-pointer px-3 h-3rem flex align-items-center border-rounded'
				animate={{
					background: '#fff',
				}}
				whileHover={{
					background: 'var(--surface-200)',
				}}
			>
				<p className='text-900 font-semibold'>{t('menu:airbnb_your_home')}</p>
			</motion.div>

			<ChangeLanguage />

			<UserAction />
		</div>
	);
};

export { RightBar };
