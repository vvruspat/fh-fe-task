import cn from "classnames";
import { ReactNode } from "react";

import "./Button.css";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  mode?: "primary" | "secondary" | "outline" | "icon";
  stretched?: boolean;
  after?: ReactNode;
  before?: ReactNode;
};

export const Button = ({
  className,
  stretched = false,
  mode = "primary",
  children,
  before,
  after,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "button",
        `${mode}-button`,
        { "stretched-button": stretched },
        className
      )}
      {...buttonProps}
    >
      {before && <div className='button-before'>{before}</div>}
      {children}
      {after && <div className='button-after'>{after}</div>}
    </button>
  );
};
