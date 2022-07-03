import React, { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useRef } from "react";
import axios from "axios";
import classes from "./CreatePost.module.css";

function CreatePost() {
  const [change, setChanger] = useState(false);
  const imageUrl = useRef("xd");
  const myInformation = useSelector((state) => state.person);
  console.log(myInformation);
  const description = useRef('');
  const handler = () => {
    setChanger((state) => !state);
  };
  const craetePost = async () => {
    const res = await axios.post("http://localhost:5000/createPost", {
      name: myInformation.firstname,
      lastname: myInformation.lastname,
      email: myInformation.email,
      potoUrl : imageUrl.current.value,
      description : description.current.value
    });
    const data = await res.data;
    console.log(data);
    if(data == 'inserted'){
        prompt('post created!')
    }
  };
  const submitHandler = () => {
    function checkImage(url) {
        var image = new Image();
        image.onload = function () {
          if (this.width > 0) {
            console.log("image exists");
            if(description.current.value.length >= 30){
                craetePost();
            }
            else{
                alert('description shoul be at least 30 letters')
            }
           
          }
        };
        image.onerror = function () {
          alert("wrong image url :/ try again");
          imageUrl.current.value = "";
        };
        image.src = url;
      }
    checkImage(imageUrl.current.value)
   
  };

  return (
    <center>
      <div className={classes.card}>
        <div className={classes.imageDiv}>
          <img src={imageUrl.current.value} alt="post image" />
        </div>

        <div className={classes.url}>
          <input
            onChange={handler}
            ref={imageUrl}
            placeholder="picture url"
            type="url"
          />
        </div>
        <div className={classes.textArea}>
            {description.current.value != undefined &&   <p>{description.current.value.length }/30</p>}
          
          <textarea
            onChange={handler}
            ref={description}
            rows="3"
            placeholder="description"
            type="textarea"
          />
        </div>
        <div className={classes.button}>
          <button onClick={submitHandler}>create post</button>
        </div>
      </div>
    </center>
  );
}

export default CreatePost;
