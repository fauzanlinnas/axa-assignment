import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../assets/icon";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "24px",
  zIndex: 1001,
  borderRadius: "10px",
  width: "420px",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .4)",
  zIndex: 1000,
};

const Modal = ({ isOpen, children, onClose, title, titleIcon }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <div className="flex items-center mb-4">
          {titleIcon}
          <h3 className={`${titleIcon ? "ml-2" : ""} text-lg flex-1 font-bold`}>
            {title}
          </h3>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
