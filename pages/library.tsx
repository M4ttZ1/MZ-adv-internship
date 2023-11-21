import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/router";
import React from "react";

export default function library() {
  const router = useRouter();

  return (
    <div className="wrapper">
      <SearchBar />
      <SideBar route={2} />
      <div className="row">
        <div className="container">
          <div className="for-you__title">Saved Books</div>
          <div className="for-you__sub--title">0 items</div>
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">Save your favorite books!</div>
            <div className="finished__books--sub-title">
              When you save a book, it will appear here.
            </div>
          </div>
          <div className="for-you__title">Finished</div>
          <div className="for-you__sub--title">0 items</div>
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">Done and dusted!</div>
            <div className="finished__books--sub-title">
              When you finish a book, you can find it here later.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}