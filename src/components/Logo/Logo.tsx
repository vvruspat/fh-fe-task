import cn from  'classnames';
import FindHotelsLogo from './logo.svg';
import './Logo.css';

type LogoProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Logo = ({className, ...divProps}: LogoProps) => {
    return <div className={cn('logo', className)} {...divProps}>
        <img src={FindHotelsLogo} alt="Find Hotels logo" />
    </div>
}