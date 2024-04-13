import { OptionType } from '@type/option';
import { ChildrenTabItem } from './children-tab-item';
import { HeaderChildrenTabType } from '@type/common';

const CheckOutTab = (data: OptionType<HeaderChildrenTabType>) => {
	return <ChildrenTabItem tab={data} />;
};

export { CheckOutTab };
