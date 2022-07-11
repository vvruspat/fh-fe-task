import { HomeFooter } from "../../HomeFooter/HomeFooter";
import { Card } from "../../kit/Card";
import { Logo } from "../../Logo/Logo";
import { SearchForm } from "../../SearchForm/SearchForm";
import { SelectGuestsModal } from "../../SelectGuestsModal";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-page">
      <Logo className="home-logo" />
      <div className="home-slogan">
        Find the perfect
        <br />
        deal, always.
      </div>
      <Card className="home-search-form">
        <SearchForm />
      </Card>
      <HomeFooter className="home-footer" />
      <SelectGuestsModal />
    </div>
  );
};
