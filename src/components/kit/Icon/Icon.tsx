import cn from "classnames";
import "./Icon.css";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  name:
    | "pointer"
    | "geo"
    | "guests"
    | "calendar"
    | "search"
    | "plus"
    | "minus"
    | "expand"
    | "remove"
    | "close";
};

export const Icon = ({ className, name }: Props) => {
  return <div className={cn("icon", name, className)}></div>;
};
