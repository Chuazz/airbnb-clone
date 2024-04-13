import { OptionType } from '@type/option';
import { ChildrenTabItem } from './children-tab-item';
import { HeaderChildrenTabType } from '@type/common';

const AddressTab = (data: OptionType<HeaderChildrenTabType>) => {
	return <ChildrenTabItem tab={data} />;
};

export { AddressTab };
