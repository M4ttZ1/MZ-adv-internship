import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Merch() {
  const { id } = useParams();
  const [posts, setPosts] = useState();

  function Fade() {
    useEffect(() => {
      AOS.init({ duration: 1200 });
    }, []);
  }
  Fade();

  useEffect(() => {
    async function getPosts() {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      // console.log(data);
      setPosts(data);
    }
    getPosts();
  }, []);

  return (
    <div>
      <Link href="/">
        <img
          data-aos="fade-in"
          data-aos-delay="100"
          loading="lazy"
          className="mt-5 m-auto h-[120px]"
          src="SolusOniVT_logo.png"
          alt="logo"
        />
      </Link>
      

      <div 
      data-aos="fade-in"
      data-aos-delay="400"
      className="text-white flex flex-col justify-center items-center h-[600px] text-6xl">
        Coming Soon
        <div className="mt-10 text-[20px]">
          check back later
        </div>
      </div>
      

      {/* <div className="flex justify-center flex-wrap text-white">
        {posts?.map((post) => (
          <div
            data-aos="fade-in"
            data-aos-delay="300"
            className="mr-4 mb-4 flex flex-col items-center border 
          rounded border-red-600 cursor-pointer sm:basis-[21%] basis-[40%]"
          >
            <div className="flex justify-center ml-2 mt-2 text-base sm:text-2xl">
              {post.title}
            </div>
            <div>
              <img
                loading="lazy"
                className="py-5 px-5 h-60 w-[100%] rounded"
                src={post.image}
                alt="product.jpg"
              />
            </div>
            <div>{`$${post.price}`}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
