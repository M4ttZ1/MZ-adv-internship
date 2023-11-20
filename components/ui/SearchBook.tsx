import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
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
export default function SearchBook({ id, title, author, audioLink, imageLink }:Book) {
  const [duration, setDuration] = useState(0);
  const router = useRouter()
  useEffect(() => {
      const audio = new Audio(audioLink)
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      }
}, []);

  return (
    <div className="search__book--link cursor-pointer" onClick={() => router.push(`/book/${id}`)}>
            <figure className="book__image--wrapper !h-20 !w-20 !min-w-[80px] ">
              <img
                className="book__image "
                src={imageLink}
                alt="book"
              />
            </figure>
            <div>
              <div className="search__book--title">
                {title}
              </div>
              <div className="search__book--author">{author}</div>
              <div className="search__book--duration">
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <AiOutlineClockCircle />
                  </div>
                  <div className="recommended__book--details-text">{formatTime(duration)}</div>
                </div>
              </div>
            </div>
          </div>
  )

}