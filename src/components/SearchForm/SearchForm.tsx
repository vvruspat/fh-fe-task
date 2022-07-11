import React, { useCallback, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../redux/store";
import { Button } from "../kit/Button";
import { DateRangePicker } from "../kit/DateRangePicker/DateRangePicker";
import { Icon } from "../kit/Icon/Icon";
import { Input } from "../kit/Input/Input";
import { MODALS, ModalsContext } from "../Modals/Modals";

import "./SearchForm.css";

export const SearchForm = () => {
  const { setModal } = useContext(ModalsContext);

  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [address, setAddress] = useState("");

  const rooms = useSelector((state: GlobalState) => state.rooms.rooms);

  const guestsNumber = useMemo(
    () =>
      rooms.reduce<number>(
        (num, room) => num + room.adults + room.children.length,
        0
      ),
    [rooms]
  );

  const onSubmitSearch = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onSelectGuestsClick = useCallback(
    (event) => {
      event.preventDefault();
      setModal(MODALS.SELECT_GUESTS_MODAL);
    },
    [setModal]
  );

  const onLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const onRangeSelect = useCallback((from: Date, to: Date) => {
    setCheckIn(from);
    setCheckOut(to);
  }, []);

  const onSearchClick = useCallback(() => {
    const serialized = rooms.reduce<string>((serialized, room) => {
      let result = serialized;

      if (result) result += "|";

      result += room.adults;

      if (room.children.length) {
        result += ":" + room.children.join(",");
      }

      return result;
    }, "");

    alert(serialized);
  }, [rooms]);

  const isDisabled = useMemo(() => {
    return !checkIn || !checkOut || !address;
  }, [checkIn, checkOut, address]);

  return (
    <form onSubmit={onSubmitSearch} className="search-form">
      <Input
        before={<Icon name="pointer" />}
        after={<Icon name="geo" />}
        placeholder="Type city, place, or hotel name"
        onChange={onLocationChange}
      />
      <div className="date-and-guests__row">
        <DateRangePicker
          className="search-form-date"
          onRangeSelect={onRangeSelect}
        />
        <Button
          className="search-form-guests"
          mode="outline"
          before={<Icon name="guests" />}
          onClick={onSelectGuestsClick}
        >
          {guestsNumber}
        </Button>
      </div>
      <Button
        stretched
        type="submit"
        disabled={isDisabled}
        onClick={onSearchClick}
      >
        Search
      </Button>
    </form>
  );
};
