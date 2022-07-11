import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import cn from "classnames";
import { useSwipeable } from "react-swipeable";
import { Button } from "../Button/Button";
import { MODALS, ModalsContext } from "../../Modals/Modals";
import { Icon } from "../Icon/Icon";

import "./Modal.css";

export type ModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  nav: MODALS;
  header?: ReactNode;
  onClose?: () => void;
};

export const Modal = ({
  nav,
  header,
  className,
  onClose,
  children,
  ...htmlProps
}: ModalProps) => {
  const [show, setShow] = useState(false);
  const { modal, setModal } = useContext(ModalsContext);

  const close = useCallback(() => {
    setModal(null);
    onClose?.();
  }, [onClose, setModal]);

  const onSwipedDown = useCallback(
    (eventData) => {
      close();
    },
    [close]
  );

  const swipeHandlers = useSwipeable({
    onSwipedDown,
    delta: 100,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
    swipeDuration: 300,
  });

  useEffect(() => {
    setShow(modal === nav);
  }, [modal, nav]);

  return (
    <>
      <div
        className={cn("modal-overlay", {
          "modal-overlay-show": show,
          "modal-overlay-hide": !show,
        })}
        onClick={() => close()}
      ></div>
      <div
        className={cn("modal", { "modal-show": show }, className)}
        {...htmlProps}
        {...swipeHandlers}
      >
        {header && (
          <header className="modal-header">
            <Button
              className="modal-header-close-button"
              onClick={() => close()}
              mode="icon"
            >
              <Icon name="close" />
            </Button>
            <div className="modal-header-content">
              {header}
            </div>
          </header>
        )}
        <section className="modal-content">{children}</section>
      </div>
    </>
  );
};
