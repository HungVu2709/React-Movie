import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Container from "../common/Container";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
