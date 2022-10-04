import React, { useState, useEffect, useRef } from "react";

import "./modal.scss";

interface IProps {
  active: boolean;
  id: string;
  children: React.ReactNode;
}
const Modal = (props: IProps) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

export const ModalContent = (props: any) => {
  const contentRef = useRef<any>(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    // parentNode
    if (props.onClose) props.onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default Modal;
