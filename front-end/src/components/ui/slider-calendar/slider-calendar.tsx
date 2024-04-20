import { Box, Button, Flex, Grid, Text, useConst } from '@chakra-ui/react';
import { useTranslation } from '@hook/use-translation';
import { Range } from '@type/common';
import { CalendarRefType } from '@type/ui/slider-calendar';
import { isSameDay, isSameMonth, isSameYear, isWithinInterval, set, startOfDay } from 'date-fns';
import { MouseEvent, useRef, useState } from 'react';
import { Calendar } from './calendar';
import styles from './slider-calendar.module.scss';

const Weeks = () => {
	const { t } = useTranslation();
	const days = ['mo', 'tu', 'we', 'th', 'fri', 'sa', 'su'];

	return (
		<Flex
			position='absolute'
			top={10}
			width='100%'
			gap='64px'
		>
			<Grid gridTemplateColumns='repeat(7, 46px)'>
				{days.map((day) => (
					<Text
						key={day}
						textAlign='center'
						fontWeight='semibold'
						color='gray.600'
					>
						{t(`common:${day}`)}
					</Text>
				))}
			</Grid>

			<Grid gridTemplateColumns='repeat(7, 46px)'>
				{days.map((day) => (
					<Text
						key={day}
						textAlign='center'
						fontWeight='semibold'
						color='gray.600'
					>
						{t(`common:${day}`)}
					</Text>
				))}
			</Grid>
		</Flex>
	);
};

const SliderCalendar = () => {
	const dateRefs = useRef<CalendarRefType[]>([]);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const calendarRef = useRef<HTMLDivElement | null>(null);
	const CURRENT_DATE = useConst(() => startOfDay(new Date()));
	const dates = dateRefs.current.flat();

	const [months, setMonths] = useState([
		CURRENT_DATE,
		set(CURRENT_DATE, { month: CURRENT_DATE.getMonth() + 1 }),
		set(CURRENT_DATE, { month: CURRENT_DATE.getMonth() + 2 }),
		set(CURRENT_DATE, { month: CURRENT_DATE.getMonth() + 3 }),
	]);

	const [range, setRange] = useState<Range<Date>>([CURRENT_DATE, CURRENT_DATE]);

	const isSame = (day1: Date, day2: Date) => {
		return isSameDay(day1, day2) && isSameMonth(day1, day2) && isSameYear(day1, day2);
	};

	const onHover = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
		const target = e.currentTarget;

		if (!isSame(range[0], range[1])) {
			target.classList.toggle(styles['date-no-bg']);

			return;
		}

		const foundFirstRangeIndex = dates.findIndex((t) => t?.dataset.name === range[0].toDateString());

		dates.forEach((date) => {
			const check = isWithinInterval(new Date(date?.dataset.name!), {
				start: set(range[0], { date: range[0].getDate() + 1 }),
				end: set(new Date(target.dataset.name!), { date: new Date(target.dataset.name!).getDate() - 1 }),
			});

			if (check) {
				date?.classList.toggle(styles['hover']);
			}
		});

		if (isSame(range[0], range[1])) {
			target.classList.toggle(styles['hover-end']);
		}

		if (foundFirstRangeIndex > -1 && dates[foundFirstRangeIndex]) {
			dates[foundFirstRangeIndex].classList.toggle(styles['hover-start']);
		}
	};

	const onClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
		const target = e.currentTarget;

		if (isSame(range[0], range[1])) {
			setRange([range[0], new Date(target.dataset.name!)]);
		}
	};

	return (
		<Box
			position='relative'
			overflow='hidden'
		>
			<Weeks />

			<Flex
				ref={scrollRef}
				gap='64px'
				transition='all 0.2s linear'
			>
				{months.map((value, index) => (
					<Box
						key={value.toDateString()}
						ref={calendarRef}
					>
						<Calendar
							value={value}
							range={range}
							ref={(ref) => {
								if (ref) {
									dateRefs.current[index] = ref;
								}
							}}
							onHover={onHover}
							onClick={onClick}
						/>
					</Box>
				))}
			</Flex>
			<Button
				onClick={() => {
					scrollRef.current.style.transform = `translateX(-${
						calendarRef.current?.clientWidth +
						64 +
						Math.abs(new WebKitCSSMatrix(scrollRef.current?.style.transform).m41)
					}px)`;
				}}
			>
				click me
			</Button>
			<Button
				onClick={() => {
					scrollRef.current.style.transform = `translateX(${
						calendarRef.current?.clientWidth + 64 + new WebKitCSSMatrix(scrollRef.current?.style.transform).m41
					}px)`;

					// scrollRef.current?.scrollTo({
					// 	left: scrollRef.current.scroll + 100,
					// 	behavior: 'smooth',
					// });
				}}
			>
				click me
			</Button>
		</Box>
	);
};

export { SliderCalendar };