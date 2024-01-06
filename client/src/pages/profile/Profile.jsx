import React, { useEffect, useState } from 'react';
import "./profile.css";
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Profile() {
  const PF = import.meta.env.VITE_API_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async() => {
      const res = await axios.get(`/api/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  },[username]);
  return (
    <>
      <Topbar/>
      <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className='profileCoverImg' src={user.CoverPicture ? PF+user.CoverPicture : PF+"person/noCover.png"} alt="" />
                    <img className='profileUserImg' src={user.ProfilePicture  ? PF+user.ProfilePicture : PF+"person/noAvatar.png"} alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar users={user}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
