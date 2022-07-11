import cn from "classnames";
import { ReactNode } from "react";
import "./Input.css";

type Props = {
  after?: ReactNode;
  before?: ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = ({ after, before, className, ...inputProps }: Props) => {
  return (
    <div className={cn("input-wrapper", className)}>
      {before && <div className="input-before">{before}</div>}
      <input className="input-element" {...inputProps} />
      {after && <div className="input-after">{after}</div>}
    </div>
  );
};
