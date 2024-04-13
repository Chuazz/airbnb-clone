import { OptionType } from '@type/option';
import { ChildrenTabItem } from './children-tab-item';
import { HeaderChildrenTabType } from '@type/common';

const CheckInTab = (data: OptionType<HeaderChildrenTabType>) => {
	return <ChildrenTabItem tab={data} />;
};

export { CheckInTab };
