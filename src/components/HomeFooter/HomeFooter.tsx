import cn from "classnames";

import Agoda from "./logos/logo-agoda.svg";
import Hotels from "./logos/logo-hotels.svg";
import Booking from "./logos/logo-booking.svg";
import Expedia from "./logos/logo-expedia.svg";
import "./HomeFooter.css";

type FooterProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const HomeFooter = ({ className, ...footerProps }: FooterProps) => {
  return (
    <footer className={cn("footer", className)} {...footerProps}>
      <img src={Agoda} alt="Agoda" />
      <img src={Hotels} alt="Hotels" />
      <img src={Booking} alt="Booking" />
      <img src={Expedia} alt="Expedia" />
    </footer>
  );
};
