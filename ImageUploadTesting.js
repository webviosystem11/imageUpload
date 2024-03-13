import axios from "axios";
import React, { useState } from "react";

function ImageUploadTesting() {
  const [image1, setImage1] = useState("");
  const [sendImage1, setSendImage1] = useState("");
  function handleImage1(e) {
    const file = e.target.files[0];
    setSendImage1(file);
    setImage1(file.name);
  }
  function handleSubmit() {
    const parsedData1 = {
      image: sendImage1,
    };
    if (sendImage1 !== "") {
      axios
        .post("http://localhost:8000/backend/aws/userImage", parsedData1, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => console.log(res, "From api"))
        .catch((er) => console.log("Erro from api", er));
    }
  }

  console.log("Image 1", image1);

  return (
    <div style={{ height: 400, marginTop: 200 }}>
      Testing fro image Upload
      <div className="admin-style-div">
        <p className="admin-title">Image1</p>
        <input
          type="file"
          onChange={handleImage1}
          className="admin-input"
          name="title"
          placeholder="Type Your file name:"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ImageUploadTesting;
