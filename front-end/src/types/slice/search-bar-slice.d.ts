import { HeaderChildrenTabType, HeaderParentTabType } from '@type/common';

type SearchBarSliceType = {
	visible: boolean;
	searching: boolean;
	parentActive: HeaderParentTabType;
	childrenActive?: HeaderChildrenTabType;
	params: {
		address: string;
		date?: {
			start: Date;
			end: Date;
		};
		guests: {
			adult: number;
			children: number;
			pet: number;
		};
	};
};

export type { SearchBarSliceType };
