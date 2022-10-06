import React from "react";

import "./_page-header.scss";

import bg from "../../assets/footer-bg.jpg";

const PageHeader = (props: any) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default PageHeader;
