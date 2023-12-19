import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import {
  FaTwitch,
  FaYoutube,
  FaXTwitter,
  FaCartShopping,
  FaDiscord,
} from "react-icons/fa6";
import "animate.css";
import "../public/F3yBFz-bcAAFIXb.png"

export default function Home() {
  function Fade() {
    useEffect(() => {
      AOS.init({ duration: 1200 });
    }, []);
  }
  Fade();

  return (
    <div className="bg-[url('../public/F3yBFz-bcAAFIXb(blur).jpg')] bg-no-repeat sticky bg-cover">
      {/* NAVBAR */}

      <div className="border-red-400">
        <div className="flex justify-between py-5 px-5">
          <div className="m-auto">
            <div data-aos="fade-in" data-aos-duration="2000" className="">
              <img
                src="SolusOniVT_logo.png"
                className="h-[160px]"
                alt="logo.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL */}

      <div className="py-10">
        <img
          data-aos="fade-in"
          data-aos-delay="300"
          className="flex top-5 rounded-full m-auto"
          src="onilogo.png"
          alt="logo.png"
          loading="lazy"
        />

        <div className="py-10 flex max-w-[1200px] m-auto">
          <div className="m-auto flex flex-col justify-center social__display">
            <Link
              data-aos="fade-in"
              data-aos-delay="700"
              className="text-4xl "
              href="https://www.youtube.com/@SolusOniPub"
            >
              <div className=" transition duration-500 flex flex-col items-center">
                <FaYoutube className="text-gray-500"/>
                <div className="text-[18px] social absolute">Youtube</div>
              </div>
            </Link>
          </div>

          <div className="m-auto flex flex-col justify-center social__display">
            <Link
              data-aos="fade-in"
              data-aos-delay="700"
              className="m-auto text-4xl"
              href="https://www.twitch.tv/solusonivt"
              target="_blank"
            >
              <div className=" transition duration-500 flex flex-col items-center">
                <FaTwitch className="text-gray-500"/>
                <div className="text-[18px] social absolute">Twitch</div>
              </div>
            </Link>
          </div>

          <div className="m-auto flex flex-col justify-center social__display">
            <Link
              data-aos="fade-in"
              data-aos-delay="700"
              className="m-auto text-4xl"
              href="https://twitter.com/SolusOniVT"
              target="_blank"
            >
              <div className=" transition duration-500 flex flex-col items-center">
                <FaXTwitter className="text-gray-500"/>
                <div className="text-[18px] social absolute">Twitter</div>
              </div>
            </Link>
          </div>

          <div className="m-auto flex flex-col justify-center social__display">
            <Link
              data-aos="fade-in"
              data-aos-delay="700"
              className="m-auto text-4xl"
              href="https://discord.com/invite/SXNEAKB5yb"
              target="_blank"
            >
              <div className=" transition duration-500 flex flex-col items-center">
                <FaDiscord className="text-gray-500"/>
                <div className="text-[18px] social absolute">Discord</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* INFO */}
      <div className="flex justify-center h-[500px]">
        <div className="max-w-[1200px] m-auto flex justify-center flex-col mb-20">
          <div data-aos="fade-in" data-aos-delay="900" className="text-2xl">
            {" "}
            Welcome valued Guest, come witness your friendly Ryokan host play a
            variety of games! Chat and enjoy the show, you might experience
            something that you'd like. Check out my{" "}
            <span>
              <a
                className=" text-[#9146FF]"
                href="https://www.twitch.tv/solusonivt/schedule"
              >
                Stream Schedule
              </a>
            </span>
            .
          </div>
          <div className="flex mt-9 flex-col">
          
            <Link
              href="/Merch"
              data-aos="fade-in"
              data-aos-delay="1400"
              className="animate__animated animate__heartBeat animate__infinite flex justify-center mt-2 text-5xl text-red-600"
            >
              SolusOni Merch
            </Link>
            
            <div className="flex justify-evenly mt-10">
              <div>
                <img
                  loading="lazy"
                  className="w-[100px] h-[200px]"
                  src="VTuberModel.png"
                  alt="vtubermodel.png"
                  data-aos="fade-in"
                  data-aos-delay="1000"
                />
              </div>
              <div>
                <img
                  loading="lazy"
                  className="w-[100px] h-[200px]"
                  src="solisillust22.png"
                  alt="solisillust22.png"
                  data-aos="fade-in"
                  data-aos-delay="1000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="h-[150px] bg-[#141414] ">
        <div className="max-w-[1200px] m-auto">
          <div className="py-11 text-white flex items-center justify-center m-auto flex-col">
            <div>Business email: solusoni@gmail.com</div>
            <div>© 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}
