import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Cardbox from "../Components/CardBox";
import Functionalaties from "../Components/Functionalaties";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../Context/userData";


const Dashboard = () => {
  const [imgdata, setImgData] = useState([]);
  const [userData, setUserData] = useData([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [indexId, setIndexId] = useState();
  const navigate = useNavigate();


  //for creating Model Operations
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for reading Model Operations
  const [openRead, setOpenRead] = useState(false);
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

  //for Updating Model Operations
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate= () => setOpenUpdate(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //get api data
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=6"
      );
      setImgData(res.data);
      console.log(imgdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  //create item
  const handleSubmit = (e) => {
    e.preventDefault();
    const temporary = {
      img: photo,
      title: name,
      about: description,
    };
    // localStorage.setItem("ud", JSON.stringify([...userData,temporary]));
    setUserData([...userData, temporary]);
    
    console.log(userData);
    setOpen(false);
    setPhoto("");
    // localStorage.setItem("ud", JSON.stringify([...userData]));
  };


  //read item
  const handleRead = (index, nm, des) => {
    const tempData = userData[index];
    setName(tempData.title);
    setDescription(tempData.about);
    handleOpenRead();
  };


  //delete item
  const removeItem = (index) => {
    try {
      let myItems = [...userData];
      myItems.splice(index, 1);
      setUserData(myItems);
      // localStorage.setItem("ud", JSON.stringify(myItems));
    } catch (error) {
      console.log(error)
    }
  };


  //update item
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    let myItems = [...userData];
    myItems[indexId].img = photo;
    myItems[indexId].title = name;
    myItems[indexId].about = description;
    setUserData(myItems);
    // localStorage.setItem("ud", JSON.stringify([...userData]));
    setPhoto("");
    setName("");
    setDescription("");
    handleCloseUpdate();
  }

  const updateFunction = (ind,nm,des,i) => {
    setIndexId(ind);
    handleOpenUpdate();
    setName(nm);
    setDescription(des);
    setPhoto(i);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="main-div-dashboard row">
          <Functionalaties />
          <div className="sub-div-b col-lg-10 m-0 p-0">
            <Navbar />
            <div className="next-main">
              <div className="myproj">API Data</div>
              <div>
                <div className="temp my-5">
                  {imgdata.map((c, index) => (
                    <>
                      <Link to={c.url} style={{textDecoration:"none", color:"black"}}>
                        <div className="imp" key={c.id}>
                          <img
                            style={{
                              height: "180px",
                              width: "360px",
                              borderRadius: "10px",
                            }}
                            src={c.download_url}
                            alt=""
                          />
                          <p
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              fontFamily:"Work Sans",
                              fontSize: "16px",
                              lineHeight: "30.69px",
                              letterSpacing: "2%",
                              margin: "0",
                            }}
                          >
                            Author : {c.author}
                          </p>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              </div>
              <div className="myproj">User Data</div>
              <div>
                <Cardbox link={handleOpen} />
                <div className="temp my-5">
                  {userData.map((c, index) => (
                    <div>
                      <div
                        className="imp"
                        key={index}
                        style={{ marginBottom: "0" }}
                      >
                        <div onClick={() => handleRead(index)}>
                          <img
                            style={{
                              height: "180px",
                              width: "360px",
                              borderRadius: "10px",
                            }}
                            src={URL.createObjectURL(c.img)}
                            alt=""
                          />
                          <p
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              fontFamily:"Work Sans",
                              fontSize: "16px",
                              lineHeight: "30.69px",
                              letterSpacing: "2%",
                              margin: "0",
                            }}
                          >
                            Title : {c.title}
                            {/* Description : {c.about} */}
                          </p>
                        </div>
                        <div>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              updateFunction(index, c.title, c.about,c.img)
                            }
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => removeItem()}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h4 className="text-center">
                        Add new image to dashboard
                      </h4>
                      <div className="mb-3">
                        {photo ? (
                          <>
                            <div className="avatar">
                              <Avatar
                                alt="Remy Sharp"
                                src={URL.createObjectURL(photo)}
                                style={{ height: "100px", width: "100px" }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <label className="btn btn-outline-secondary col-md-12">
                              {photo ? photo.name : "Upload Photo"}
                                <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                  hidden
                                  required
                              />
                            </label>
                          </>
                        )}
                      </div>
                      <TextField
                        className="mb-3"
                        id="outlined-basic"
                        label="Image Title"
                        variant="outlined"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                      <TextField
                        className="mb-3"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        required
                      />
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </form>
                  </Box>
                </Modal>
                <Modal
                  open={openRead}
                  onClose={handleCloseRead}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <h3>Title : {name}</h3>
                    <h5>Description : {description}</h5>
                  </Box>
                </Modal>
                <Modal
                  open={openUpdate}
                  onClose={handleCloseUpdate}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form
                      onSubmit={handleSubmitUpdate}
                      style={{
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h4 className="text-center">Update</h4>
                      <div className="mb-3">
                        {photo ? (
                          <>
                            <div className="avatar">
                              <Avatar
                                alt="Remy Sharp"
                                src={URL.createObjectURL(photo)}
                                style={{ height: "100px", width: "100px" }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <label className="btn btn-outline-secondary col-md-12">
                              {photo ? photo.name : "Upload Photo"}
                              <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden
                              />
                            </label>
                          </>
                        )}
                      </div>
                      <TextField
                        className="mb-3"
                        id="outlined-basic"
                        label="Image Title"
                        variant="outlined"
                        defaultValue={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                      <TextField
                        className="mb-3"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        defaultValue={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        required
                      />
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
