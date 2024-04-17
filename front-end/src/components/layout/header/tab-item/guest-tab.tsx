import { OptionType } from '@type/option';
import { ChildrenTabItem } from './children-tab-item';
import { HeaderChildrenTabType } from '@type/common';
import { Overlay } from '@component/overlay';
import { GuestOverlay } from '../overlay/guest-overlay';

const GuestTab = (data: OptionType<HeaderChildrenTabType>) => {
	return (
		<Overlay
			content={<GuestOverlay />}
			buttonProps={{
				style: data.styles,
			}}
			popoverProps={{
				placement: 'bottom-end',
			}}
		>
			<ChildrenTabItem tab={data} />
		</Overlay>
	);
};

export { GuestTab };
