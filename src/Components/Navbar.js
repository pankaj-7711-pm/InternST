import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const Navbar = () => {
  return (
    <>
      <div className="aa">
        <div
          style={{
            marginLeft: "auto",
            width: "300px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Hello! Welcome to my Dashboard{" "}
          <span style={{marginLeft:"0.5rem"}}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
