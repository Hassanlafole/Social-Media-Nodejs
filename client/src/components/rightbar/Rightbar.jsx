import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from '../online/Online';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

function Rightbar({users}) {
  const {user} = useContext(AuthContext);
  const PF = import.meta.env.VITE_API_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);


  useEffect(() => {
    const getFriends = async()=>{
      try{
        const friendList = await axios.get("/api/users/friends/" + user._id);
        setFriends(friendList.data);
      }catch(err) {
        console.log(err);
      }
    }
    getFriends();
  },[user]);



  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Omar Hajji</b> and <b>3 other freinds</b> have a birthday today
          </span>
        </div>
        <img className='rightbarAd' src="/assets/ad.png" alt="" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u}/>
          ))}
        </ul>
      </>
    )
  };

  const ProfileRightbar = () => {
    return(
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/"+friend.username} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img className='rightbarFollowingImg' src={friend.ProfilePicture  ? PF+friend.ProfilePicture : PF+"person/noAvatar.png"} alt="" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {users ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
