import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType } from '@type/common';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';
import { classNames } from 'primereact/utils';
import { PropsWithChildren } from 'react';

import styles from './tab-item.module.scss';

const ChildrenTabItem = ({
	tab,
	children,
}: {
	tab: OptionType<HeaderChildrenTabType>;
} & PropsWithChildren) => {
	const searching = useSelector((state) => state.searchBar.searching);
	const childrenActiveTab = useSelector((state) => state.searchBar.childrenActive);
	const dispatch = useDispatch();

	return (
		<div style={tab.styles}>
			<motion.div
				style={{
					boxShadow: tab.code === childrenActiveTab ? 'var(--header-shadow)' : 'none',
				}}
				className={classNames(
					'flex align-items-center justify-content-between cursor-pointer border-rounded relative py-3 border-1 border-left-none border-right-none border-transparent relative',
					styles[`container-${searching}`],
					styles['container'],
					tab.className,
					{
						'bg-white border-200 z-1': tab.code === childrenActiveTab,
						[styles['active']]: tab.code === childrenActiveTab,
					},
				)}
				onClick={() => {
					dispatch(searchBarSlice.actions.setChildrenActive(tab.code));
					dispatch(searchBarSlice.actions.setSearching(true));

					tab.action?.();
				}}
			>
				<div className={classNames('px-4 flex flex-column gap-1 w-full', tab.className)}>
					<p className='text-sm text-900 font-semibold'>{tab.label}</p>
					<p className='text-600'>{tab.subLabel}</p>
				</div>

				{children}

				{tab.divide && (
					<div className={classNames(styles[`container-border-${searching}`], styles['container-border'])} />
				)}
			</motion.div>
		</div>
	);
};

export { ChildrenTabItem };
