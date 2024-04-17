import { HeaderChildrenTabType } from '@type/common';
import { OptionType } from '@type/option';
import { ChildrenTabItem } from './children-tab-item';
import { useContext } from 'react';
import { ActiveTabContext } from '../search-bar';

const CheckInTab = (data: OptionType<HeaderChildrenTabType>) => {
	const { onToggle } = useContext(ActiveTabContext);

	return (
		<ChildrenTabItem
			tab={{
				...data,
				action() {
					onToggle();
				},
			}}
		/>
	);
};

export { CheckInTab };
