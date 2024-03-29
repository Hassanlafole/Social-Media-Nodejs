import React from 'react';
import "./closeFriend.css";

function CloseFriend({user}) {
  const PF = import.meta.env.VITE_API_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
        <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default CloseFriend
