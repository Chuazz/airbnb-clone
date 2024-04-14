import { Box, Text, useOutsideClick } from '@chakra-ui/react';
import { ReactIcon } from '@component/ui/react-icon';
import { useTranslation } from '@hook/use-translation';
import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';
import { OptionType } from '@type/option';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { AddressTab } from '../tab-item/address-tab';
import { CheckInTab } from '../tab-item/check-in-tab';
import { CheckOutTab } from '../tab-item/check-out-tab';
import { GuestTab } from '../tab-item/guest-tab';
import itemStyles from '../tab-item/tab-item.module.scss';
import { TextShadow } from '@component/ui/text-shadow';

const ActiveTab = () => {
	const { t } = useTranslation();
	const parentActiveTab = useSelector((state) => state.searchBar.parentActive);
	const childrenActiveTab = useSelector((state) => state.searchBar.childrenActive);
	const searching = useSelector((state) => state.searchBar.searching);
	const dispatch = useDispatch();
	const tabRef = useRef<HTMLDivElement>(null);

	const tabs: OptionType<HeaderParentTabType>[] = [
		{
			code: 'stays',
			label: t('menu:stays'),
			action() {},
		},
		{
			code: 'experiences',
			label: t('menu:experiences'),
			action() {},
		},
		{
			code: 'online_experiences',
			label: t('menu:online_experiences'),
		},
	];

	const childrenTabs: OptionType<HeaderChildrenTabType, { className?: string; divide?: boolean }>[] = [
		{
			code: 'where',
			shouldShow: ['stays', 'experiences'].includes(parentActiveTab),
			component: (data) => (
				<AddressTab
					code='where'
					label='Where'
					subLabel='Search destinations'
					divide={true}
					styles={{
						flexBasis: parentActiveTab === 'stays' ? '30%' : '40%',
						paddingRight: '0.25rem',
					}}
					className={classNames(itemStyles['hover-right'], data.className)}
				/>
			),
		},
		{
			code: 'check_in',
			shouldShow: ['stays'].includes(parentActiveTab),
			component: (data) => (
				<CheckInTab
					code='check_in'
					label='Check in'
					subLabel='Add dates'
					divide={true}
					styles={{
						flexBasis: '20%',
						paddingLeft: '0.25rem',
						paddingRight: '0.25rem',
					}}
					className={classNames(itemStyles['hover-both'], data.className)}
				/>
			),
		},
		{
			code: 'check_out',
			shouldShow: ['stays'].includes(parentActiveTab),
			component: (data) => (
				<CheckOutTab
					code='check_out'
					label='Check out'
					subLabel='Add dates'
					divide={true}
					styles={{
						flexBasis: '20%',
						paddingLeft: '0.25rem',
						paddingRight: '0.25rem',
					}}
					className={classNames(itemStyles['hover-both'], data.className)}
				/>
			),
		},
		{
			code: 'date',
			shouldShow: ['experiences'].includes(parentActiveTab),
			component: (data) => (
				<CheckOutTab
					code='date'
					label='Date'
					subLabel='Add dates'
					divide={true}
					styles={{
						flexBasis: '40%',
						paddingLeft: '0.25rem',
						paddingRight: '0.25rem',
					}}
					className={classNames(itemStyles['hover-both'], data.className)}
				/>
			),
		},
		{
			code: 'who',
			shouldShow: ['stays', 'experiences'].includes(parentActiveTab),
			component: (data) => (
				<GuestTab
					code='who'
					label='Who'
					subLabel='Add guests'
					styles={{
						flexBasis: parentActiveTab === 'stays' ? '30%' : '40%',
						paddingLeft: '0.25rem',
					}}
					className={classNames(itemStyles['hover-left'], data.className)}
				/>
			),
		},
	];

	const handleClassName = (index: number) => {
		const tabs = childrenTabs.filter((t) => t.shouldShow);

		if (tabs[index + 1] && tabs[index + 1].code === childrenActiveTab) {
			return itemStyles['hover-searching-right'];
		}

		if (tabs[index - 1] && tabs[index - 1].code === childrenActiveTab) {
			return itemStyles['hover-searching-left'];
		}

		if (tabs[index].code === childrenActiveTab) {
			return itemStyles['hide-border'];
		}

		return '';
	};

	useOutsideClick({
		ref: tabRef,
		handler: () => {
			if (searching) {
				dispatch(searchBarSlice.actions.setSearching(false));
				dispatch(searchBarSlice.actions.setChildrenActive(undefined));

				if (window.scrollY > 0) {
					dispatch(searchBarSlice.actions.setVisible(false));
				}
			}
		},
	});

	return (
		<div ref={tabRef}>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				gap={3}
			>
				{tabs.map((tab) => (
					<Box
						as={motion.div}
						key={tab.code}
						cursor='pointer'
						borderRadius={99999}
						px={3}
						py={3}
						initial={{
							background: '#fff',
						}}
						whileHover={{
							background: tab.code === parentActiveTab ? '#fff' : 'var(--chakra-colors-gray-100)',
						}}
						onClick={() => {
							tab.action?.();

							dispatch(searchBarSlice.actions.setParentActive(tab.code));
						}}
					>
						<TextShadow
							fontWeight={tab.code === parentActiveTab ? '600' : '400'}
							transition='all linear 0.1s'
							color={tab.code === parentActiveTab ? 'gray.900' : 'gray.500'}
						>
							{tab.label}
						</TextShadow>
					</Box>
				))}
			</Box>

			<Box
				boxShadow='header'
				background={searching ? 'white.700' : 'transparent'}
				borderRadius={99999}
				display='flex'
				alignItems='center'
				mt={3}
				position='relative'
				border='1px'
				borderColor='gray.200'
			>
				{childrenTabs
					.filter((t) => t.shouldShow)
					.map(
						(tab, index) =>
							tab.component && (
								<tab.component
									key={tab.code}
									className={handleClassName(index)}
								/>
							),
					)}

				<Box
					as={motion.div}
					zIndex={2}
					position='absolute'
					right={0}
					gap={2}
					borderRadius={9999}
					display='flex'
					alignItems='center'
					justifyContent='center'
					mr={2}
					overflow='hidden'
					cursor='pointer'
					bgGradient='primary'
					height='48px'
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

					{searching && (
						<Text
							color='white'
							fontWeight='500'
						>
							Search
						</Text>
					)}
				</Box>
			</Box>
		</div>
	);
};

export { ActiveTab };
