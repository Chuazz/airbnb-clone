import { Range } from '@type/common';

type CalendarType = {
	value: Date;
	range: Range<Date>;
	onHover: (_e: MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onClick: (_e: MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

type CalendarRefType = (HTMLDivElement | null)[];

type SliderCalendarType = {};

export type { CalendarRefType, CalendarType, SliderCalendarType };
