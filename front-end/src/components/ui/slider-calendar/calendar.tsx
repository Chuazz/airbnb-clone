import { Box, Center, Grid, Text } from '@chakra-ui/react';
import { CalendarRefType, CalendarType } from '@type/ui/slider-calendar';
import {
	compareAsc,
	eachDayOfInterval,
	endOfMonth,
	format,
	isSameDay,
	isSameMonth,
	isThisMonth,
	set,
	startOfMonth,
} from 'date-fns';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import styles from './slider-calendar.module.scss';
import classNames from 'classnames';

const Calendar = forwardRef<CalendarRefType, CalendarType>(({ value, onHover, onClick, range }, ref) => {
	const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

	const days = (() => {
		const start = startOfMonth(value);
		const end = endOfMonth(value);

		let result = eachDayOfInterval({
			start,
			end,
		});

		if (start.getDay() > 1) {
			let endOfOldMonth = endOfMonth(set(value, { month: value.getMonth() - 1 }));

			for (let index = 0; index < start.getDay() - 1; index++) {
				result = [endOfOldMonth].concat(result);

				endOfOldMonth = set(endOfOldMonth, { date: endOfOldMonth.getDate() - 1 });
			}
		}

		return result;
	})();

	useImperativeHandle(ref, () => dayRefs.current);

	return (
		<Box width='fit-content'>
			<Text
				fontSize='lg'
				fontWeight='semibold'
				textAlign='center'
				mb={12}
			>
				{format(value, 'MMMM dd')}
			</Text>

			<Grid templateColumns='repeat(7, 46px)'>
				{days.map((day, index) => (
					<Center
						key={day.toDateString()}
						ref={(ref) => (dayRefs.current[index] = ref)}
						data-name={day.toDateString()}
						width='46px'
						height='46px'
						cursor='pointer'
						position='relative'
						transform={`scale(${isSameMonth(day, value) ? 1 : 0})`}
						className={classNames(styles['date'], {
							[styles['range-start']]: isSameDay(day, range[0]) && isSameMonth(day, range[0]),
							[styles['range-end']]: isSameDay(day, range[1]) && isSameMonth(day, range[1]),
							[styles['active']]:
								(isSameDay(day, range[0]) && isSameMonth(day, range[0])) ||
								(isSameDay(day, range[1]) && isSameMonth(day, range[1])),
							[styles['range-both-ends']]:
								isSameDay(day, range[1]) &&
								isSameMonth(day, range[1]) &&
								isSameDay(day, range[0]) &&
								isSameMonth(day, range[0]),
						})}
						onMouseEnter={onHover}
						onMouseLeave={onHover}
						onClick={onClick}
					>
						<Text fontWeight='semibold'>{day.getDate()}</Text>
					</Center>
				))}
			</Grid>
		</Box>
	);
});

Calendar.displayName = 'Calendar';

export { Calendar };
