import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType } from '@type/common';
import { OptionType } from '@type/option';
import { headerStyles } from '..';
import classNames from 'classnames';
import { Box, Divider } from '@chakra-ui/react';

const InactiveTab = () => {
	const parentActiveTab = useSelector((state) => state.searchBar.parentActive);
	const dispatch = useDispatch();

	const tabs: OptionType<HeaderChildrenTabType>[] = [
		{
			code: 'where',
			label: 'Anywhere',
			divide: true,
			className: 'text-900 font-semibold',
		},
		{
			code: parentActiveTab === 'stays' ? 'check_in' : 'date',
			label: 'Any week',
			divide: true,
			className: 'text-900 font-semibold',
		},
		{
			code: 'who',
			label: 'Add guests',
		},
	];

	return (
		<Box
			display='flex'
			alignItems='center'
			borderRadius={9999}
			gap={3}
			px={4}
			border='1px'
			borderColor='gray.200'
			shadow='header'
		>
			{tabs.map((tab) => (
				<Box
					key={tab.code}
					py={3}
					gap={3}
					display='flex'
					alignItems='center'
					cursor='pointer'
					onClick={() => {
						dispatch(searchBarSlice.actions.setChildrenActive(tab.code));
						dispatch(searchBarSlice.actions.setVisible(true));
						dispatch(searchBarSlice.actions.setSearching(true));
					}}
				>
					<p>{tab.label}</p>

					{tab.divide && (
						<Divider
							orientation='vertical'
							height='18px'
							borderColor='gray.300'
						/>
					)}
				</Box>
			))}
		</Box>
	);
};

export { InactiveTab };
