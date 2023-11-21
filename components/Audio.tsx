import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

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

export default function Audio() {
  const [data, setData] = useState<Book>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const json = await response.data;
        setData(json);
      };
      fetchData();
    }
  }, [id]);

  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const audioRef: any = useRef();
  const progressBarRef: any = useRef();
  const playAnimationRef: any = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const repeat: any = useCallback(() => {
    const currentTime: any = audioRef?.current?.currentTime;
    if (currentTime !== undefined) {
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="audio__wrapper">
      <audio src={data?.audioLink}></audio>
      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <figure className="md:book__image--wrapper h-12 w-12 in-w-[48px]">
            <img
              className="book__image book"
              src={data?.imageLink}
              alt="book"
            />
          </figure>
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{data?.title}</div>
          <div className="audio__track--author">{data?.author}</div>
        </div>
      </div>
      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={skipBackward}>
            <IoPlayBackSharp size={24} color="#fff" />
          </button>
          <button
            onClick={togglePlayPause}
            className="audio__controls--btn flex items-center justify-center audio__controls--btn-play"
          >
            {isPlaying ? <IoPauseSharp size={28} /> : <IoPlaySharp size={28} />}
          </button>
          <button className="audio__controls--btn" onClick={skipForward}>
            <IoPlayForwardSharp color="#fff" size={24} />
          </button>
        </div>
      </div>
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(timeProgress)}</div>
        <input
          type="range"
          className="audio__progress--bar"
          ref={progressBarRef}
          onChange={handleProgressChange}
        ></input>
        <audio
          src={data?.audioLink}
          className="audio__progress--bar"
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </div>
  );
}