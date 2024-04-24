import { Box, Center, Flex, useConst } from '@chakra-ui/react';
import { Range } from '@type/common';
import { CalendarRefType } from '@type/ui/slider-calendar';
import {
	compareAsc,
	eachMonthOfInterval,
	endOfYear,
	isSameDay,
	isSameMonth,
	isSameYear,
	isWithinInterval,
	set,
	startOfDay,
} from 'date-fns';
import { MouseEvent, useRef, useState } from 'react';
import { ReactIcon } from '../react-icon';
import { Calendar } from './calendar';
import styles from './slider-calendar.module.scss';
import { Weeks } from './weeks';
import { motion } from 'framer-motion';

const SliderCalendar = () => {
	const CURRENT_DATE = useConst(() => startOfDay(new Date()));
	const GAP = useConst(() => 63);
	const dateRefs = useRef<CalendarRefType[]>([]);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const calendarRef = useRef<HTMLDivElement | null>(null);
	const [translateX, setTranslateX] = useState(0);
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
		const targetName = new Date(target.dataset.name!);
		const isStart = compareAsc(targetName, range[0]) === -1;
		const foundFirstRangeIndex = dates.findIndex((t) => t?.dataset.name === range[0].toDateString());

		if (!isSame(range[0], range[1])) {
			target.classList.toggle(styles['date-no-bg']);

			return;
		}

		dates.forEach((date) => {
			const check = isWithinInterval(new Date(date?.dataset.name!), {
				start: isStart ? targetName : set(range[0], { date: range[0].getDate() + 1 }),
				end: isStart ? range[0] : set(targetName, { date: targetName.getDate() - 1 }),
			});

			if (check) {
				date?.classList.toggle(styles['hover']);
			}
		});

		if (isSame(range[0], range[1])) {
			if (compareAsc(targetName, range[0]) === -1) {
				target.classList.toggle(styles['hover-start']);
			}

			if (compareAsc(targetName, range[0]) === 1) {
				target.classList.toggle(styles['hover-end']);
			}
		}

		if (foundFirstRangeIndex > -1 && dates[foundFirstRangeIndex]) {
			const dateRefName = new Date(dates[foundFirstRangeIndex].dataset.name!);

			if (compareAsc(dateRefName, targetName) === -1) {
				dates[foundFirstRangeIndex].classList.toggle(styles['hover-start']);
			}

			if (compareAsc(dateRefName, targetName) === 1) {
				dates[foundFirstRangeIndex].classList.toggle(styles['hover-end']);
			}
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

		if (to === 'back' && translateX < 0) {
			setTranslateX(calendarRef.current?.clientWidth + GAP + translateX);
		}

		if (to === 'forward' && Math.abs(translateX) < (months.length - 2) * (calendarRef.current.clientWidth + GAP)) {
			setTranslateX(-(calendarRef.current?.clientWidth + GAP + Math.abs(translateX)));
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
					cursor={translateX < 0 ? 'pointer' : 'not-allowed'}
					_hover={{
						backgroundColor: 'white.700',
					}}
					onClick={() => onSlide('back')}
				>
					<ReactIcon
						icon='io-chevron-back'
						boxSize={5}
						color={translateX < 0 ? 'gray.900' : 'gray.500'}
					/>
				</Center>

				<Center
					width={8}
					height={8}
					borderRadius='full'
					cursor={
						Math.abs(translateX) < (months.length - 2) * (calendarRef.current?.clientWidth! + GAP)
							? 'pointer'
							: 'not-allowed'
					}
					_hover={{
						backgroundColor: 'white.700',
					}}
					onClick={() => onSlide('forward')}
				>
					<ReactIcon
						icon='io-chevron-forward'
						boxSize={5}
						color={
							Math.abs(translateX) < (months.length - 2) * (calendarRef.current?.clientWidth! + GAP)
								? 'gray.900'
								: 'gray.500'
						}
					/>
				</Center>
			</Flex>

			<Flex
				as={motion.div}
				ref={scrollRef}
				gap={`${63}px`}
				transition='all 0.2s linear'
				initial={{
					transform: 'translateX(0px)',
				}}
				animate={{
					transform: `translateX(${translateX}px)`,
				}}
			>
				{months.map((value, index) => (
					<Box
						key={value.toDateString()}
						ref={calendarRef}
					>
						<Calendar
							ref={(ref) => {
								if (ref) {
									dateRefs.current[index] = ref;
								}
							}}
							value={value}
							range={range}
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
