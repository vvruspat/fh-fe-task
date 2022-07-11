import { useSelector } from "react-redux";

import { MODALS, ModalsContext } from "../Modals/Modals";
import { Button } from "../kit/Button";
import { Modal } from "../kit/Modal";
import { Icon } from "../kit/Icon/Icon";
import { Rooms } from "../Rooms/Rooms";
import "./SelectGuestsModal.css";
import { useContext, useMemo } from "react";
import { GlobalState } from "../../redux/store";

type SelectGuestsModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const SelectGuestsModal = ({
  ...modalProps
}: SelectGuestsModalProps) => {
  const { setModal } = useContext(ModalsContext);
  const rooms = useSelector((state: GlobalState) => state.rooms.rooms);

  const guestsNumber = useMemo(() => rooms.reduce<number>((num, room) => num + room.adults + room.children.length, 0), [rooms]);

  return (
    <Modal
      nav={MODALS.SELECT_GUESTS_MODAL}
      className="select-guests-modal"
      header="Who is staying?"
      {...modalProps}
    >
      <Rooms />

      <div className="select-guest-footer">
        <Button before={<Icon name="search" />} className="select-guest-search-button" onClick={() => setModal(null)}>
          Search <span className="select-guest-search-button-data">{rooms.length} rooms • {guestsNumber} guests</span>
        </Button>
      </div>
    </Modal>
  );
};
