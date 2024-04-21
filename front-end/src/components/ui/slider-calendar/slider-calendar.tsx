import { Box, Button, Center, Flex, Grid, Text, useConst } from '@chakra-ui/react';
import { useTranslation } from '@hook/use-translation';
import { Range } from '@type/common';
import { CalendarRefType } from '@type/ui/slider-calendar';
import {
	eachMonthOfInterval,
	endOfYear,
	isSameDay,
	isSameMonth,
	isSameYear,
	isWithinInterval,
	set,
	startOfDay,
	startOfYear,
} from 'date-fns';
import { MouseEvent, useRef, useState } from 'react';
import { Calendar } from './calendar';
import styles from './slider-calendar.module.scss';
import { ReactIcon } from '../react-icon';

const Weeks = () => {
	const { t } = useTranslation();
	const days = ['mo', 'tu', 'we', 'th', 'fri', 'sa', 'su'];

	return (
		<Flex
			position='absolute'
			top={12}
			width='100%'
			justifyContent='space-between'
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
	const [range, setRange] = useState<Range<Date>>([CURRENT_DATE, CURRENT_DATE]);
	const dates = dateRefs.current.flat();

	const months = useConst(() => {
		const end = endOfYear(CURRENT_DATE);

		const result = eachMonthOfInterval({
			start: CURRENT_DATE,
			end: set(end, { year: end.getFullYear() + 2 }),
		});

		return result;
	});

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

	const onSlide = (to: 'back' | 'forward') => {
		if (!scrollRef.current || !calendarRef.current) {
			return;
		}

		const translateX = new WebKitCSSMatrix(scrollRef.current.style.transform).m41;

		if (to === 'back' && translateX < 0) {
			scrollRef.current.style.transform = `translateX(${calendarRef.current?.clientWidth + 78 + translateX}px)`;
		}

		if (to === 'forward' && Math.abs(translateX) < (months.length - 2) * (calendarRef.current.clientWidth + 78)) {
			scrollRef.current.style.transform = `translateX(-${
				calendarRef.current?.clientWidth + 78 + Math.abs(translateX)
			}px)`;
		}
	};

	return (
		<Box
			position='relative'
			overflow='hidden'
		>
			<Weeks />

			<Flex
				position='absolute'
				top={0}
				left={0}
				right={0}
				justifyContent='space-between'
				alignItems='center'
				zIndex={2}
			>
				<Center
					width={8}
					height={8}
					borderRadius='full'
					cursor='pointer'
					_hover={{
						backgroundColor: 'white.700',
					}}
					onClick={() => onSlide('back')}
				>
					<ReactIcon
						icon='io-chevron-back'
						boxSize={5}
					/>
				</Center>

				<Center
					width={8}
					height={8}
					borderRadius='full'
					cursor='pointer'
					_hover={{
						backgroundColor: 'white.700',
					}}
					onClick={() => onSlide('forward')}
				>
					<ReactIcon
						icon='io-chevron-forward'
						boxSize={5}
					/>
				</Center>
			</Flex>

			<Flex
				ref={scrollRef}
				gap='78px'
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
		</Box>
	);
};

export { SliderCalendar };
