import React from 'react';
import "../Styles/RightMenu.css";
import { FaBell, FaCogs, FaCrown, FaRegHeart } from 'react-icons/fa';
import Profile  from '../images/female-avatar-profile-icon-round-woman-face-vector-18307315.jpg';

function RightMenu(){
    return (
        <div className="rightMenu">
              <div className='goPro'>
                <i><FaCrown/><p>Go<span>Pro</span></p></i>
                <i><FaBell/></i>
                <i><FaRegHeart/></i>
                </div>
              <div className='profile'>
                


                <i><FaCogs/></i>
                <div className='profileImage'>
                    <img src={Profile} alt=''/>
                </div>
              </div>
        </div>
    )
}
export  {RightMenu};