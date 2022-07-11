import cn from "classnames";

import "./Card.css";

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Card = ({ className, children, ...htmlProps }: CardProps) => {
  return (
    <section className={cn("card", className)} {...htmlProps}>
      {children}
    </section>
  );
};
