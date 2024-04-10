import { useDispatch, useSelector } from '@redux/store';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';
import styles from '../header.module.scss';
import { classNames } from 'primereact/utils';
import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { HeaderChildrenTabType } from '@type/common';
import { PropsWithChildren } from 'react';

const ChildrenTabItem = ({
	tab,
	tabs,
	index,
	children,
}: {
	index: number;
	tab: OptionType<HeaderChildrenTabType>;
	tabs: OptionType<HeaderChildrenTabType>[];
} & PropsWithChildren) => {
	const childrenActiveTab = useSelector((state) => state.searchBar.childrenActive);
	const searching = useSelector((state) => state.searchBar.searching);
	const dispatch = useDispatch();

	const onHover = (tab: OptionType, index: number, e: MouseEvent) => {
		const target = e.target as HTMLDivElement;

		if (tab.code === childrenActiveTab) {
			return;
		}

		if (tabs[index + 1] && tabs[index + 1].code === childrenActiveTab) {
			target.classList.toggle(styles['after']);
		}

		if (tabs[index - 1] && tabs[index - 1].code === childrenActiveTab) {
			target.classList.toggle(styles['before']);
		}

		target.classList.toggle(styles['hide-border']);

		if (searching) {
			target.classList.toggle(styles.searching);
		}
	};

	return (
		<motion.div
			style={{
				...tab.styles,
				boxShadow: tab.code === childrenActiveTab ? 'var(--header-shadow)' : 'none',
			}}
			className={classNames(
				'flex align-items-center justify-content-between cursor-pointer border-rounded px-3 py-2 border-1 border-transparent',
				tab.className,
				styles['children-tab-item'],
				{
					[styles.border]: tab.divide,
					'z-2 relative bg-white border-200': tab.code === childrenActiveTab,
				},
			)}
			onHoverStart={(e) => {
				onHover(tab, index, e);
			}}
			onHoverEnd={(e) => {
				onHover(tab, index, e);
			}}
			onClick={() => {
				dispatch(searchBarSlice.actions.setChildrenActive(tab.code));
				dispatch(searchBarSlice.actions.setSearching(true));
			}}
		>
			<div className='px-3 py-2 flex flex-column gap-1'>
				<p className='text-sm text-900 font-semibold'>{tab.label}</p>
				<p className='text-600'>{tab.subLabel}</p>
			</div>

			<div className={styles['item-background']} />

			{children}
		</motion.div>
	);
};

export { ChildrenTabItem };
