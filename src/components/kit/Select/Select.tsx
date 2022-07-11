import { useCallback, useState } from "react";
import cn from "classnames";
import { Button } from "../Button";
import { Card } from "../Card";
import { Icon } from "../Icon/Icon";

import "./Select.css";

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  defaultValue?: string;
  placeholder: string;
  onSelect: (value: SelectOption) => void;
};

export const Select = ({
  options,
  defaultValue,
  onSelect,
  placeholder,
}: Props) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [selected, setSelected] = useState<SelectOption>(
    defaultValue
      ? options.find((option) => option.value === defaultValue)
      : null
  );

  const toggleDropdown = useCallback(() => {
    setDropdownOpened(!dropdownOpened);
  }, [dropdownOpened]);

  const onOptionClick = useCallback(
    (option: SelectOption) => {
      setSelected(option);
      setDropdownOpened(false);

      onSelect(option);
    },
    [onSelect]
  );

  return (
    <div className="select">
      <Button
        mode="outline"
        onClick={() => toggleDropdown()}
        after={<Icon name="expand" />}
        className={cn("select-button", { opened: dropdownOpened })}
      >
        {selected?.label ?? placeholder}
      </Button>
      <Card className={cn("select-dropdown", { opened: dropdownOpened })}>
        {options.map((option) => (
          <div
            key={option.value}
            className={cn("select-option", {
              selected: selected?.value === option.value,
            })}
            onClick={() => onOptionClick(option)}
          >
            {option.label}
          </div>
        ))}
      </Card>
    </div>
  );
};
