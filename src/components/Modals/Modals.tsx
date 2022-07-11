import React, { ReactNode, useCallback, useState } from "react";

export const ModalsContext = React.createContext<{
  setModal: (modal: MODALS | null) => void;
  modal: MODALS | null;
}>({
  setModal: (modal: MODALS | null) => {},
  modal: null,
});

export enum MODALS {
  SELECT_GUESTS_MODAL = "select-guests",
  TEST_MODAL = "test-modal",
}

type ModalsRootProps = {
  children: ReactNode;
};

export const ModalsRoot = ({ children }: ModalsRootProps) => {
  const [currentModal, setCurrentModal] = useState<MODALS | null>(null);

  const setModal = useCallback((modal: MODALS | null) => {
    setCurrentModal(modal);
  }, []);

  return (
    <ModalsContext.Provider value={{ setModal, modal: currentModal }}>
      {children}
    </ModalsContext.Provider>
  );
};
