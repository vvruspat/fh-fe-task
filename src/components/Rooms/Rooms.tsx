import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Button } from '../kit/Button';
import { Icon } from '../kit/Icon/Icon';
import { Room } from '../Room/Room';
import {
    addRoom,
    removeRoom,
    updateRoom,
} from "../../redux/rooms/roomsSlice";
import { GlobalState } from '../../redux/store';
import './Rooms.css';

export const Rooms = () => {
    const roomsRef = useRef<HTMLDivElement>();
    const dispatch = useDispatch();
    const rooms = useSelector((state: GlobalState) => state.rooms.rooms);

    const onRoomAdd = useCallback(() => {
        dispatch(addRoom());
    }, [dispatch]);

    const onRoomRemove = useCallback((id: string) => {
        dispatch(removeRoom(id));
    }, [dispatch]);

    const onRoomUpdateAdults = useCallback((id: string, adults: number) => {
        const idx = rooms.findIndex((room) => room.id === id);
        const room = {...rooms[idx]};

        if (adults === room.adults) return;

        room.adults = adults;

        dispatch(updateRoom(room));
    }, [rooms, dispatch]);

    useEffect(() => {
        if (rooms.length > 1) {
            roomsRef.current?.scrollTo?.({ top: roomsRef.current.scrollHeight + 248 });
        }
    }, [rooms.length]);

    return <div className="rooms">
        <div className={cn("rooms-wrapper", {"extended": (roomsRef.current?.scrollHeight ?? 0) > (roomsRef.current?.offsetHeight ?? 0)})} ref={roomsRef}>
            {rooms.map((room, index) => {
                return <Room 
                    room={room} 
                    index={index + 1} 
                    key={room.id} 
                    onRemove={() => onRoomRemove(room.id)} 
                    onUpdateAdults={(adults) => onRoomUpdateAdults(room.id, adults)} 
                />
            })}
        </div>
        {rooms.length < 8 && <div className="add-room-button-wrapper">
            <Button mode="secondary" onClick={onRoomAdd} className="add-room-button" before={<Icon name="plus" />}>Add Room</Button>
        </div>}
    </div>;
}