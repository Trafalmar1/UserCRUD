import { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

import classes from "./styles.module.scss";

type ModalProps = {
  children?: ReactNode | ReactNode[];
  visible?: boolean;
  toggle?: VoidFunction;
};

const Modal: FC<ModalProps> = ({ children, visible, toggle }) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const toggleModalHandler = () => {
    if (!toggle) return;
    toggle();
  };

  useEffect(() => {
    setRoot(document.getElementById("modal-root"));
  }, []);

  return root !== null && visible
    ? ReactDOM.createPortal(
        <>
          <Backdrop onClick={toggleModalHandler} />
          <div className={classes.Modal}>{children}</div>
        </>,
        root
      )
    : null;
};

export default Modal;
