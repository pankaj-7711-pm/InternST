import React from 'react'
import AppsIcon from "@mui/icons-material/Apps";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Functionalaties = () => {
  return (
    <>
      <div className="sub-div-a col-lg-2 m-0 p-0">
        <div className="brand">
          <h4>Necleo</h4>
        </div>
        <hr
          style={{
            width: "60%",
            height: "1px",
            textAlign: "center",
            opacity: "20%",
          }}
        />
        <div>
          <div className="men" style={{ color: "#FA782F" }}>
            <i class="fa-solid fa-coins"></i> My Projects
          </div>
          <div className="men">
            <i class="fa-solid fa-vector-square"></i> Sample Projects
          </div>
        </div>
        <hr style={{ width: "60%", height: "1px", textAlign: "center" }} />
        <div>
          <div className="men">
            <AppsIcon/> Apps
          </div>
          <div className="men"><PlayCircleIcon/> Intro to Necleo</div>
        </div>
        <div className="lower-div">
          <div className="men"><HelpIcon/> Help & Support</div>
          <div className="men"><FeedbackIcon/> Feedback</div>
          <div className="men" style={{ color: "#000000", marginBottom:"1rem"}}>
            <ArrowCircleLeftIcon/> Collapse
          </div>
        </div>
      </div>
    </>
  );
}

export default Functionalaties
