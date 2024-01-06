import React, { useContext, useRef, useState } from 'react';
import "./share.css";
import axios from 'axios';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

function Share() {

  const PF = import.meta.env.VITE_API_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.img = filename;
      try{
        await axios.post("/api/upload", data);
      }catch(err){
        console.log(err)
      }
    }

    try{
      await axios.post("/api/posts", newPost);
      // window.location.reload();
    }catch(err){

    }
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img className='shareProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" />
            <input placeholder={"What's in your mind " + user.username+"?"} ref={desc} className="shareInput" />
        </div>
        <hr className='shareHr'/>
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareIcon'/>
                    <span className="shareOptionsText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id='file' accept='.png,.jpeg,,jpg' onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon'/>
                    <span className="shareOptionsText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon'/>
                    <span className="shareOptionsText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                    <span className="shareOptionsText">Feelings</span>
                </div>
            </div>
            <button type='submit' className='shareButton'>Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
