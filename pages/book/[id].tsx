import { openLoginModal } from "@/Redux/ModalSlice";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import AuthModal from "@/components/modals/AuthModel";
import Skeleton from "@/components/ui/Skeleton";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
AiFillStar,
  AiOutlineClockCircle,
  AiOutlineStar,
} from "react-icons/ai";
import { BsBook, BsBookmark, BsLightbulb, BsMic } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const router = useRouter();
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
        const audio = new Audio(data?.audioLink)
        audio.onloadedmetadata = () => {
          setDuration(audio.duration);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [id]);
  const user = useSelector((state:any) => state.user)
  const dispatch = useDispatch()
  function handlePlay(){
    if(user.email === null){
      dispatch(
        openLoginModal()
      )
      return
    }
    if(user.premium === true || data?.subscriptionRequired !== true){
      router.push(`/player/${id}`);
    }
    else{
      router.push("/choose-plan")
    }
  }
  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="wrapper">
      <SearchBar />
      <SideBar route={0}/>
      <AuthModal />
      <div className="max-w-[1070px] w-full mx-auto px-6">
        <div className="py-6 w-full">
          { loading ? <>
            <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title"><Skeleton width="100%" height={50} borderRadius={0}/></div>
              <div className="inner-book__author"><Skeleton width={200} height={30} borderRadius={0}/></div>
              <div className="inner-book__sub--title">
              <Skeleton width="100%" height={20} borderRadius={0}/>
              </div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                  <Skeleton width={100} height={20} borderRadius={0}/>
                  </div>
                  <div className="inner-book__description">
                  <Skeleton width={100} height={20} borderRadius={0}/>

                  </div>
                  <div className="inner-book__description">
                  <Skeleton width={100} height={20} borderRadius={0}/>
                  </div>
                  <div className="inner-book__description">
                  <Skeleton width={100} height={20} borderRadius={0}/>
                  </div>
                </div>
              </div>
              <div className="inner-book__read--btn-wrapper">
              <Skeleton width={120} height={50} borderRadius={0}/>
              <Skeleton width={120} height={50} borderRadius={0}/>
              </div>
              <div className="inner-book__bookmark">
              <Skeleton width={300} height={30} borderRadius={0}/>
              </div>
              <div className="inner-book__secondary--title">
              <Skeleton width={200} height={30} borderRadius={0}/>
              </div>
              <div className="inner-book__tags--wrapper">
              <Skeleton width={240} height={30} borderRadius={0}/>
              </div>
              <div className="inner-book__book--description">
              <Skeleton width="100%" height={200} borderRadius={0}/>
              </div>
              <h2 className="inner-book__secondary--title"><Skeleton width={240} height={30} borderRadius={0}/></h2>
              <div className="inner-book__author--description">
              <Skeleton width="100%" height={200} borderRadius={0}/>
              </div>
            </div>
            <div className="inner-book--img-wrapper">
            <Skeleton width={300} height={300} borderRadius={0}/>
            </div>
          </div>
          </> :
          <div className="inner__wrapper" key={data?.id}>
            <div className="inner__book">
              <div className="inner-book__title">{data?.title}</div>
              <div className="inner-book__author">{data?.author}</div>
              <div className="inner-book__sub--title">
                Time-tested advice for the digital age
              </div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                    <div className="inner-book__icon w-full h-full">
                      <AiOutlineStar size={24} />
                    </div>
                    <div className="inner-book__key--ideas">
                      {`${data?.averageRating} (${data?.totalRating} ratings )`}
                    </div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon w-full h-full">
                      <AiOutlineClockCircle size={24} />
                    </div>
                    <div className="inner-book__key--ideas">
                      {formatTime(duration)}
                    </div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon w-full h-full">
                      <BsMic size={24} />
                    </div>
                    <div className="inner-book__key--ideas">{data?.type}</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon">
                      <BsLightbulb size={24} />
                    </div>
                    <div className="inner-book__key--ideas">
                      {`${data?.keyIdeas} key ideas`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="inner-book__read--btn-wrapper">
                <button className="inner-book__read--btn" onClick={handlePlay}>
                  <div className="inner-book__read--icon">
                    <BsBook />
                  </div>
                  <div className="inner-book__read--text">Read</div>
                </button>
                <button className="inner-book__read--btn" onClick={handlePlay}>
                  <div className="inner-book__read--icon">
                    <BsMic />
                  </div>
                  <div className="inner-book__read--text">Listen</div>
                </button>
              </div>
              <div className="inner-book__bookmark">
                <div className="inner-book__bookmark--icon">
                  <BsBookmark />
                </div>
                <div className="inner-book__bookmark--text">
                  Add title to My Library
                </div>
              </div>
              <div className="inner-book__secondary--title">
                What's it about?
              </div>
              <div className="inner-book__tags--wrapper">
                {data?.tags.map((tag) => (
                  <div className="inner-book__tag">{tag} </div>
                ))}
              </div>
              <div className="inner-book__book--description">
                {data?.bookDescription}
              </div>
              <h2 className="inner-book__secondary--title">About the author</h2>
              <div className="inner-book__author--description">
                {data?.authorDescription}
              </div>
            </div>
            <div className="inner-book--img-wrapper">
              <figure className="h-[300px] w-[300px] min-w-[300px]">
                <img
                  className="book__image block"
                  src={data?.imageLink}
                  alt="book"
                />
              </figure>
            </div>
          </div>
        }
        </div>
      </div>
    </div>
  );
}