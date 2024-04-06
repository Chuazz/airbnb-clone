import { ReactIcon } from '@component/ui/react-icon';
import { useTranslation } from '@hook/use-translation';
import { LanguageModalType } from '@type/modal/language-modal-type';
import { OptionType } from '@type/option-type';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Currency } from './components/currency';
import { Region } from './components/region';

const LanguageModal = ({ onClose }: LanguageModalType) => {
	const { t } = useTranslation();
	const [active, setActive] = useState('region');

	const tabs: OptionType[] = [
		{
			code: 'region',
			label: t('common:language_region'),
		},

		{
			code: 'currency',
			label: t('common:currency'),
		},
	];

	return (
		<div className='px-4 pb-4 relative'>
			<div className='flex align-items-center h-4rem'>
				<div
					className='w-3rem h-3rem border-circle flex align-items-center justify-content-center cursor-pointer hover:surface-100'
					onClick={onClose}
					style={{
						marginLeft: '-12px',
					}}
				>
					<ReactIcon
						icon='ih-mini-x-mark'
						size={20}
					/>
				</div>
			</div>

			<div className='overflow-auto overflow-x-hidden flex flex-column gap-6'>
				<div className='flex align-items-start gap-3 border-bottom-1 border-300'>
					{tabs.map((tab) => (
						<div key={tab.code}>
							<motion.div
								className='cursor-pointer p-2 border-round mb-2 hover:surface-100'
								whileTap={{
									scale: 0.95,
								}}
								onClick={() => {
									setActive(tab.code);
								}}
							>
								<motion.p
									className='font-semibold text-lg'
									animate={{
										color: tab.code === active ? 'var(--surface-900)' : 'var(--surface-500)',
									}}
								>
									{tab.label}
								</motion.p>
							</motion.div>

							<motion.div
								className='border-bottom-3'
								style={{
									transformOrigin: '50% top',
								}}
								animate={{
									opacity: tab.code === active ? 1 : 0,
									scale: tab.code === active ? 1 : 0,
								}}
							/>
						</div>
					))}
				</div>

				{active === 'region' && <Region />}

				{active === 'currency' && <Currency />}
			</div>
		</div>
	);
};

export { LanguageModal };
