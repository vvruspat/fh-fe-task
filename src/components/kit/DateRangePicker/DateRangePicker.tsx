import { useCallback, useEffect, useState } from "react";
import DatePicker from 'sassy-datepicker';
import cn from "classnames";
import { Icon } from "../Icon/Icon";
import "./DateRangePicker.css";

type Props = React.DetailedHTMLProps<
React.HTMLAttributes<HTMLDivElement>,
HTMLDivElement
> & {
    onRangeSelect: (from, to) => void;
}

export const DateRangePicker = ({onRangeSelect, className, ...divProps}: Props) => {
    const [checkIn, setCheckIn] = useState<Date | undefined>();
    const [checkOut, setCheckOut] = useState<Date | undefined>();
    const [checkInPickerShown, setCheckInPickerShown] = useState(false);
    const [checkOutPickerShown, setCheckOutPickerShown] = useState(false);

    const onCheckInChange = useCallback((date: Date) => {
        setCheckInPickerShown(false);
        setCheckIn(date);
    }, []);
    const onCheckOutChange = useCallback((date: Date) => {
        setCheckOutPickerShown(false);
        setCheckOut(date);
    }, []);

    useEffect(() => {
        if (checkIn && checkOut) {
            onRangeSelect(checkIn, checkOut);
        }
    }, [checkIn, checkOut, onRangeSelect]);

    return <div className={cn('date-picker', className)} {...divProps}>
        
        <button className="date-picker-button" onClick={() => setCheckInPickerShown(true)} type="button">
            <Icon name="calendar" className="date-picker-button-icon" />{checkIn ? (new Intl.DateTimeFormat('en-US')).format(checkIn) : 'Check-in'}
        </button>
        <div className="date-picker-spacer"></div>
        <button className="date-picker-button" onClick={() => setCheckOutPickerShown(true)} type="button">
            {checkOut ? (new Intl.DateTimeFormat('en-US')).format(checkOut) : 'Check-out'}
        </button>

        <div className="date-pickers-wrapper">
            {checkInPickerShown && <DatePicker onChange={onCheckInChange} className="date-picker-popup" />}
            {checkOutPickerShown && <DatePicker onChange={onCheckOutChange} className="date-picker-popup" />}
        </div>
    </div>;
}