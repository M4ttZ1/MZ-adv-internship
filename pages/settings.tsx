import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/Redux/ModalSlice";
import { auth, initFirebase } from "@/firebase";
import { getPremiumStatus } from "@/checkStatus";
import { useRouter } from "next/router";
import AuthModal from "@/components/modals/AuthModel";

export default function settings() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter()
  function handleSignIn() {
    dispatch(openLoginModal());
  }
  const [isPremium, setIsPremium] = useState(false);
  const app = initFirebase();
  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  return (
    <div className="wrapper">
      <AuthModal />
      <SearchBar />
      <SideBar route={3} />
      <div className="container">
        <div className="row">
          {!user.email ? (
            <>
              <div className="section__title page__title">Settings</div>
              <div className="settings__login--wrapper">
                <img src="login.png" />
                <div className="settings__login--text">
                  Log in to your account to see your details.
                </div>
                <button className="btn !w-[100px]" onClick={handleSignIn}>
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="section__title page__title">Settings</div>
              <div className="setting__content">
                <div className="settings__sub--title">
                  Your Subscription plan
                </div>
                {isPremium ? (
                  <div className="settings__text">Premium</div>
                ) : (
                  <>
                  <div className="settings__text">Basic</div>
                  <div className="btn settings__upgrade--btn" onClick={() => router.push("/choose-plan")}>
                    Upgrade to Premium
                  </div>
                  </>
                )}
              </div>
              <div className="setting__content">
                <div className="settings__sub--title">Email</div>
                <div className="settings__text">{user.email}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}