import React, { useEffect, useState } from 'react'
import { AiFillStar,AiOutlineClockCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'

// const { getAudioDurationInSeconds } = require('get-audio-duration')
interface Book {
    id: string
    author: string
    title: string
    subTitle: string
    imageLink: string
    audioLink: string
    totalRating: Number
    averageRating: Number
    keyIdeas: Number
    type: string
    status: string
    subscriptionRequired: boolean
    summary: string
    tags: string[]
    bookDescription: string
    authorDescription: string
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
export default function Book({ id, title, author, audioLink,  subTitle, averageRating, imageLink, subscriptionRequired }: Book) {
    const user = useSelector((state: any) => state.user);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        const audio = new Audio(audioLink)
        audio.onloadedmetadata = () => {
          setDuration(audio.duration);
        }
  }, []);

    return (
            <a className="for-you__recommended--books-link" href={`/book/${id}`}>
                {!user.premium && (subscriptionRequired && <div className="book__pill book__pill--subscription-required">Premium</div>)}
                <figure className="book__image--wrapper mb-2" >
                    <img className="book__image" src={imageLink} alt="book" />
                </figure>
                <div className="recommended__book--title">{title}</div>
                <div className="recommended__book--author">{author}</div>
                <div className="recommended__book--sub-title">{subTitle}</div>
                <div className="recommended__book--details-wrapper">
                    <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                            <AiOutlineClockCircle />
                        </div>
                        <div className="recommended__book--details-text">{formatTime(duration)}</div>
                        <div className="recommended__book--details-icon">
                            <AiFillStar />
                        </div>
                        <div className="recommended__book--details-text">{`${averageRating}`}</div>
                    </div>
                </div>
            </a>
    )
}