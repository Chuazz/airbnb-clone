import { TextShadow } from '@component/ui/text-shadow';
import { useTranslation } from '@hook/use-translation';
import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';
import { useClickOutside } from 'primereact/hooks';
import { classNames } from 'primereact/utils';
import { useRef, useState } from 'react';
import { ReactIcon } from '@component/ui/react-icon';

import styles from '../header.module.scss';

const ActiveTab = () => {
	const { t } = useTranslation();
	const parentActiveTab = useSelector((state) => state.searchBar.parentActive);
	const childrenActiveTab = useSelector((state) => state.searchBar.childrenActive);
	const searching = useSelector((state) => state.searchBar.searching);
	const dispatch = useDispatch();
	const tabRef = useRef<HTMLDivElement>(null);

	const staysChildrenTabs: OptionType<HeaderChildrenTabType>[] = [
		{
			code: 'where',
			label: 'Where',
			subLabel: 'Search destinations',
			styles: {
				flexBasis: '40%',
			},
		},
		{
			code: 'check_in',
			label: 'Check in',
			subLabel: 'Add dates',
			styles: {
				flexBasis: '20%',
			},
		},
		{
			code: 'check_out',
			label: 'Check out',
			subLabel: 'Add dates',
			styles: {
				flexBasis: '20%',
			},
		},
		{
			code: 'who',
			label: 'Who',
			subLabel: 'Add guests',
			styles: {
				flexBasis: '40%',
			},
		},
	];

	const experiencesChildrenTabs: OptionType<HeaderChildrenTabType>[] = [
		{
			code: 'where',
			label: 'Where',
			subLabel: 'Search destinations',
			styles: {
				flexBasis: '40%',
			},
		},
		{
			code: 'date',
			label: 'Date',
			subLabel: 'Add dates',
			styles: {
				flexBasis: '40%',
			},
		},
		{
			code: 'who',
			label: 'Who',
			subLabel: 'Add guests',
			styles: {
				flexBasis: '40%',
			},
		},
	];

	const tabs: OptionType<HeaderParentTabType>[] = [
		{
			code: 'stays',
			label: t('menu:stays'),
			action() {
				setActiveTabs(staysChildrenTabs);
			},
		},
		{
			code: 'experiences',
			label: t('menu:experiences'),
			action() {
				setActiveTabs(experiencesChildrenTabs);
			},
		},
		{
			code: 'online_experiences',
			label: t('menu:online_experiences'),
		},
	];

	const [activeTabs, setActiveTabs] = useState(staysChildrenTabs);

	const handleShowDivide = (tab: OptionType, index: number) => {
		if (tab.code === childrenActiveTab) {
			return false;
		}

		if (activeTabs[index + 1] && activeTabs[index + 1].code === childrenActiveTab) {
			return false;
		}

		if (index === activeTabs.length - 1) {
			return false;
		}

		return true;
	};

	const onHover = (tab: OptionType, index: number, e: MouseEvent) => {
		const target = e.target as HTMLDivElement;

		if (tab.code === childrenActiveTab) {
			return;
		}

		if (activeTabs[index + 1] && activeTabs[index + 1].code === childrenActiveTab) {
			target.classList.toggle(styles['after']);
		}

		if (activeTabs[index - 1] && activeTabs[index - 1].code === childrenActiveTab) {
			target.classList.toggle(styles['before']);
		}

		target.classList.toggle(styles['hide-border']);

		if (searching) {
			target.classList.toggle(styles.searching);
		}
	};

	useClickOutside(tabRef, () => {
		if (searching) {
			dispatch(searchBarSlice.actions.setSearching(false));
			dispatch(searchBarSlice.actions.setChildrenActive(undefined));
		}
	});

	return (
		<div ref={tabRef}>
			<div className='flex align-items-center justify-content-center gap-3'>
				{tabs.map((tab) => (
					<motion.div
						key={tab.code}
						className='cursor-pointer border-rounded px-4 py-3'
						initial={{
							background: '#fff',
						}}
						whileHover={{
							background: tab.code === parentActiveTab ? '#fff' : 'var(--surface-100)',
						}}
						onClick={() => {
							tab.action?.();

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

			<div
				style={{
					boxShadow: 'var(--header-shadow)',
					background: searching ? 'var(--ebebeb)' : 'transparent',
				}}
				className='border-rounded flex align-items-center mt-3 relative border-1 border-300'
			>
				{activeTabs.map((tab, index) => (
					<motion.div
						key={tab.code}
						style={{
							...tab.styles,
							boxShadow: tab.code === childrenActiveTab ? 'var(--header-shadow)' : 'none',
						}}
						className={classNames(
							'flex align-items-center justify-content-between cursor-pointer border-rounded px-3 py-2 border-1 border-transparent',
							tab.className,
							styles['children-tab-item'],
							{
								[styles.border]: handleShowDivide(tab, index),
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
					</motion.div>
				))}

				<motion.div
					className='z-2 vertical-center absolute right-0 gap-2 border-rounded flex align-items-center justify-content-center mr-2 overflow-hidden cursor-pointer'
					style={{
						background: searching ? 'var(--primary-gradient)' : 'var(--primary)',
						height: '48px',
					}}
					initial={{
						width: '48px',
					}}
					animate={{
						width: searching ? '7.5rem' : '48px',
					}}
				>
					<ReactIcon
						icon='hi-mini-magnifying-glass'
						color='white'
						size={20}
					/>

					{searching && <p className='text-white font-semibold'>Search</p>}
				</motion.div>
			</div>
		</div>
	);
};

export { ActiveTab };
