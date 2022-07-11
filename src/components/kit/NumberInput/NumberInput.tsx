import cn from "classnames";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon/Icon";
import { Input } from "../Input/Input";

import "./NumberInput.css";

type Props = {
  after?: ReactNode;
  before?: ReactNode;
  min?: number;
  max?: number;
  onNumberChange?: (value: number, direction: "inc" | "dec") => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const NumberInput = ({
  after,
  before,
  className,
  value,
  min = 0,
  max = Infinity,
  onNumberChange,
  ...inputProps
}: Props) => {
  const [currentValue, setCurrentValue] = useState(value ? Number(value) : min);

  const onDecrement = useCallback(() => {
    const val = Math.max(currentValue - 1, min);

    setCurrentValue(val);
    onNumberChange(val, "dec");
  }, [currentValue, onNumberChange, min]);

  const onIncrement = useCallback(() => {
    const val = Math.min(currentValue + 1, max);

    setCurrentValue(val);
    onNumberChange(val, "inc");
  }, [currentValue, onNumberChange, max]);

  const onInputChange = useCallback(
    (event) => {
      const val = Number(event.target.value);

      if (currentValue !== val) {
        onNumberChange(val, currentValue > val ? "dec" : "inc");
        setCurrentValue(val);
      }
    },
    [currentValue, onNumberChange]
  );

  useEffect(() => {
    setCurrentValue(Number(value));
  }, [value]);

  return (
    <div className={cn("number-input-wrapper", className)}>
      <Input
        before={
          <Button
            mode="secondary"
            className="number-input-button"
            onClick={onDecrement}
          >
            <Icon name="minus" />
          </Button>
        }
        after={
          <Button
            mode="secondary"
            className="number-input-button"
            onClick={onIncrement}
          >
            <Icon name="plus" />
          </Button>
        }
        type="number"
        className="number-input-element"
        value={currentValue}
        onChange={onInputChange}
        {...inputProps}
      />
    </div>
  );
};
