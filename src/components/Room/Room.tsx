import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  removeChild,
  updateChild,
  updateRoom,
} from "../../redux/rooms/roomsSlice";
import { TRoom } from "../../types/room.type";
import { Button } from "../kit/Button";
import { Icon } from "../kit/Icon/Icon";
import { NumberInput } from "../kit/NumberInput/NumberInput";
import { Select, SelectOption } from "../kit/Select/Select";

import "./Room.css";

type Props = {
  room: TRoom;
  index: number;
  onRemove: () => void;
  onUpdateAdults: (adults: number) => void;
};

const ageOptions: SelectOption[] = Array.from(Array(16).keys()).map((key) => ({
  label: key.toString(),
  value: key.toString(),
}));

const maxRoomFullfilled = 5;

export const Room = ({ room, index, onRemove, onUpdateAdults }: Props) => {
  const dispatch = useDispatch();

  const onChildrenNumberChange = useCallback(
    (value, direction) => {
      const howMuch = Math.abs(value - room.children.length);

      if (howMuch) {
        const newChildren = [...room.children];

        if (direction === "inc") {
          for (let i = 0; i < howMuch; i++) {
            newChildren.push(1);
          }
        } else {
          newChildren.splice(value);
        }

        dispatch(updateRoom({ ...room, children: newChildren }));
      }
    },
    [room, dispatch]
  );

  const onRemoveChild = useCallback(
    (index) => {
      dispatch(removeChild({ roomId: room.id, childIndex: index }));
    },
    [room, dispatch]
  );

  const onUpdateChild = useCallback(
    (index, age) => {
      dispatch(updateChild({ roomId: room.id, childIndex: index, age }));
    },
    [room, dispatch]
  );

  return (
    <div className="room">
      <div className="room-title">
        Room {index}
        {index > 1 && (
          <Button
            mode="icon"
            className="room-remove-button"
            onClick={() => onRemove()}
          >
            Remove room
          </Button>
        )}
      </div>

      <div className="room-guests">
        <div className="room-guest">
          <div className="room-guests-title">Adults</div>
          <div className="room-guests-number">
            <NumberInput
              value={room.adults}
              min={1}
              max={maxRoomFullfilled - room.children.length}
              onNumberChange={(value) => onUpdateAdults(value)}
            />
          </div>
        </div>
        <div className="room-guest">
          <div className="room-guests-title">Children</div>
          <div className="room-guests-number">
            <NumberInput
              value={room.children.length}
              min={0}
              max={Math.min(3, maxRoomFullfilled - room.adults)}
              onNumberChange={onChildrenNumberChange}
            />
          </div>
          <div className="room-children">
            {/* TODO: idx is a bad decision for key, but i dont have in data any unique id */}
            {room.children.map((age, idx) => (
              <div className="room-child" key={idx}>
                <div className="room-guests-title">Child {idx + 1} age</div>
                <div className="room-guests-number">
                  <Select
                    options={ageOptions}
                    placeholder="Age"
                    defaultValue={age.toString()}
                    onSelect={(option) => onUpdateChild(idx, option.value)}
                  />
                </div>
                <Button
                  mode="icon"
                  onClick={() => onRemoveChild(idx)}
                  className="room-child-remove-button"
                >
                  <Icon name="remove" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
