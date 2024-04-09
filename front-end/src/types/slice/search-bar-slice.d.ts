import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';

type SearchBarSliceType = {
	visible: boolean;
	searching: boolean;
	parentActive: HeaderParentTabType;
	childrenActive?: HeaderChildrenTabType;
};

export type { SearchBarSliceType };
