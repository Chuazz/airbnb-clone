import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';

type SearchBarSliceType = {
	visible: boolean;
	parentActive: HeaderParentTabType;
	childrenActive: HeaderChildrenTabType;
};

export type { SearchBarSliceType };
