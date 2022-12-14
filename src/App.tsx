import React from "react";

import "./App.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import RoutesConfig from "./routes/Routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <RoutesConfig />
      <Footer />
    </>
  );
}

export default App;
