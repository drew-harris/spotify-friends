import React from "react";
import { SHOW_INSTALL_POPUP } from "../constants";

const InstallPopup = () => {
  if (!SHOW_INSTALL_POPUP) {
    return null;
  }
  return (
    <div className="install-popup">
      For a better experience, add this website to your homescreen
    </div>
  );
};

export { InstallPopup };
