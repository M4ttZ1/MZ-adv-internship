import Audio from "@/components/Audio";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Skeleton from "@/components/ui/Skeleton";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: Number;
  averageRating: Number;
  keyIdeas: Number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function Id() {
  const [data, setData] = useState<Book>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const json = await response.data;
        setData(json);
        setLoading(false);
      };
      fetchData();
    }
  }, [id]);
  return (
    <div className="wrapper">
      <SideBar route={9} />
      <SearchBar />
      <div className="max-w-[1070px] w-full mx-auto px-6">
        <div className="py-6 w-full">
          <div className="summary">
            {loading ? (
              <>
                <div className=" h-full flex items-center justify-center">
                  <div className="lds-dual-ring"></div>
                </div>
                <div className="audio__wrapper">
                  <audio src={data?.audioLink}></audio>
                  <div className="audio__track--wrapper">
                    <figure className="audio__track--image-mask">
                      <figure className="md:book__image--wrapper h-12 w-12 in-w-[48px]">
                        <Skeleton width={50} height={50} borderRadius={0} />
                      </figure>
                    </figure>
                    <div className="audio__track--details-wrapper">
                      <div className="audio__track--title">
                        <Skeleton width={120} height={14} borderRadius={0} />
                      </div>
                      <div className="audio__track--author">
                        <Skeleton width={80} height={14} borderRadius={0} />
                      </div>
                    </div>
                  </div>
                  <div className="audio__controls--wrapper">
                    <div className="audio__controls">
                      <Skeleton width={50} height={50} borderRadius={9999} />
                    </div>
                  </div>
                  <div className="audio__progress--wrapper">
                    <Skeleton width={400} height={10} borderRadius={10} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="audio__book--summary text-[16px]" key={data?.id}>
                  <div className="audio__book--summary-title">
                    <b>{data?.title}</b>
                  </div>
                  <div className="audio__book--summary-text">
                    {data?.summary}
                  </div>
                </div>
                <Audio />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}