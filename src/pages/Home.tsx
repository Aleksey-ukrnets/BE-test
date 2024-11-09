import { Game } from "../components/Game";
import { TONConnectPage } from "../components/TONConnect";

export const Home = () => {
  return (
    <div>
      <TONConnectPage />
      <Game />
    </div>
  );
};
