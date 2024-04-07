import { TextShadow } from '@component/ui/text-shadow';
import { useTranslation } from '@hook/use-translation';
import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderParentTabType } from '@type/common';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';

const SearchBar = () => {
	const parentActiveTab = useSelector((state) => state.searchBar.parentActive);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const tabs: OptionType<HeaderParentTabType>[] = [
		{
			code: 'stays',
			label: t('menu:stays'),
		},
		{
			code: 'experiences',
			label: t('menu:experiences'),
		},
		{
			code: 'online_experiences',
			label: t('menu:online_experiences'),
		},
	];

	return (
		<div className='absolute-center flex justify-content-center'>
			<div className='flex align-items-center gap-3'>
				{tabs.map((tab) => (
					<motion.div
						key={tab.code}
						className='text-lg cursor-pointer border-rounded px-4 py-3'
						initial={{
							background: '#fff',
						}}
						whileHover={{
							background: tab.code === parentActiveTab ? '#fff' : 'var(--surface-100)',
						}}
						onClick={() => {
							dispatch(searchBarSlice.actions.setParentActive(tab.code));
						}}
					>
						<TextShadow
							style={{
								fontWeight: tab.code === parentActiveTab ? '600' : '400',
								transition: 'all linear 0.1s',
								color: tab.code === parentActiveTab ? 'var(--surface-900)' : 'var(--surface-500)',
							}}
						>
							{tab.label}
						</TextShadow>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export { SearchBar };
