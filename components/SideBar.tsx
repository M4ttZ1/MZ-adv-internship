import React, {useState, useEffect} from "react";
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark, BsPen } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import {LuLogOut} from "react-icons/lu"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { openSideBarModal } from "@/Redux/ModalSlice";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import SideBarModal from "./modals/SideBarModal";
interface route {
  route: number
}

export default function SideBar({route}:route){
    const router = useRouter()
    const user = useSelector((state:any) => state.user)
    const dispatch = useDispatch()
    const app = initFirebase()
    const auth = getAuth(app)
    function handleSignOut(){
      console.log(user)
        if(user.email === null){
            dispatch(openSideBarModal())
        }
        else{
          auth.signOut()
          router.reload()
        }
    }

  return (
    <div className="sidebar sidebar--closed">
        <SideBarModal />
      <div className="sidebar__logo">
        <img alt="" src={route === 0 || route === 9 ? "../logo.png" : "logo.png"} />
      </div>
      <div className={`sidebar__wrapper ${route === 9 && `sidebar__read`}`}>
        <div className="sidebar__top">
          <a className="sidebar__link--wrapper" onClick={() => router.push("/ForYou")}>
            <div className={`sidebar__link--line ${route === 1 && `active--tab`}`}></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineHome />
            </div>
            <div className="sidebar__link--text">For you</div>
          </a>
          <a className="sidebar__link--wrapper" onClick={() =>  router.push("/library")}>
            <div className={`sidebar__link--line ${route === 2 && `active--tab`}`}></div>
            <div className="sidebar__icon--wrapper">
             <BsBookmark />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </a>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line "></div>
            <div className="sidebar__icon--wrapper">
            <BsPen />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line "></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineSearch />
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>
        </div>
        <div className="sidebar__bottom">
          <a className="sidebar__link--wrapper" onClick={() => router.push("/settings")}>
            <div className={`sidebar__link--line ${route === 3 && `active--tab`}`}></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineSetting />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </a>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line "></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineQuestionCircle />
            </div>
            <div className="sidebar__link--text">Help &amp; Support</div>
          </div>
          <div className="sidebar__link--wrapper" onClick={handleSignOut}>
            <div className="sidebar__link--line "></div>
            <div className="sidebar__icon--wrapper">
              <LuLogOut />
            </div>
            <div className="sidebar__link--text">{user.email === null ? "Login" : "Logout"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}