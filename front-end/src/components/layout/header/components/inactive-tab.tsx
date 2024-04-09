import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType } from '@type/common';
import { OptionType } from '@type/option';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

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
			label: 'Any guests',
		},
	];

	return (
		<div
			className='flex align-items-center border-rounded'
			style={{
				boxShadow: 'var(--header-shadow)',
			}}
		>
			{tabs.map((tab) => (
				<div
					key={tab.code}
					className={classNames('p-3 flex align-items-center cursor-pointer', tab.className)}
					onClick={() => {
						dispatch(searchBarSlice.actions.setChildrenActive(tab.code));
						dispatch(searchBarSlice.actions.setVisible(true));
						dispatch(searchBarSlice.actions.setSearching(true));
					}}
				>
					<p>{tab.label}</p>
				</div>
			))}
		</div>
	);
};

export { InactiveTab };
