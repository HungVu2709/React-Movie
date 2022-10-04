import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import "./App.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import RouterManager from "./routes/Routes";

export const history = createBrowserHistory();

const App = () => {
  return (
    <HistoryRouter history={history}>
      <RouterManager />
    </HistoryRouter>
  );
};
export default App;
