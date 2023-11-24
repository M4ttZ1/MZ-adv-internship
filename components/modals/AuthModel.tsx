import { closeLoginModal, openLoginModal } from "@/Redux/ModalSlice";
import { Modal } from "@mui/material";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { setUser } from "@/Redux/UserSlice";
import { initFirebase } from "@/firebase";
import { getPremiumStatus } from "@/checkStatus";

export default function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [changePassword, setchangePassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.modal.loginModal);
  const GGprovider = new GoogleAuthProvider();
  const app = initFirebase();
  const [premium, setPremium] = useState<boolean>();
  const auth = getAuth(app);
  const user = useSelector((state: any) => state.user);
  async function handleGgSignIn() {
    const result = await signInWithPopup(auth, GGprovider);
    const user = result.user;
    if (user) {
      dispatch(closeLoginModal());
    }
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(closeLoginModal());
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Sign-in failed because of ${errorMessage}`);
      });
  }
  function handleGuestSignIn() {
    signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123")
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(closeLoginModal());
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Sign-in failed because of ${errorMessage}`);
      });
  }
  async function handleSignUp() {
    const userCredentials = createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(closeLoginModal());
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Sign-up failed because of ${errorMessage}`);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      dispatch(
        setUser({
          email: user.email,
          uid: user.uid,
          premium: newPremiumStatus,
        })
      );
    };
    checkPremium();
  }, []);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[400px] bg-[#fff] relative rounded-lg flex flex-col justify-center ">
          <div className="auth__content w-full">
            <div className="text-[20px] font-bold text-center text-black mb-6">
              {changePassword
                ? "Reset your password"
                : `${!signup ? "Login" : "Sign up"} to Summarist`}
            </div>
            {!signup && (
              <>
                <button
                  className="guest__btn--wrapper relative"
                  onClick={handleGuestSignIn}
                >
                  <div className="absolute left-2 ">
                    <BiUser size={28} />
                  </div>
                  <div>Login as a Guest</div>
                </button>
                <div className="auth__separator">
                  <span className="auth__separator--text">or</span>
                </div>
              </>
            )}
            <button
              className="google__btn--wrapper relative"
              onClick={handleGgSignIn}
            >
              <div className="absolute left-2 ">
                <img
                  src={"../google.png" || "google.png"}
                  className="w-7 h-7"
                />
              </div>
              <div>Login with Google</div>
            </button>
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
            <form className="auth__main--form">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="auth__main--input"
                type="text"
                placeholder="Email Address"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="auth__main--input"
                type="password"
                placeholder="Password"
              />
              <button
                className="btn"
                onClick={signup ? handleSignUp : handleSignIn}
              >
                <span>{!signup ? "Login" : "Sign up"}</span>
              </button>
            </form>
          </div>
          <div className="auth__forgot--password">Forgot your password?</div>
          <button
            className="auth__switch--btn"
            onClick={() => setSignup(!signup)}
          >
            {signup ? "Already have an account?" : "Don't have an account?"}
          </button>
        </div>
      </Modal>
    </>
  );
}
