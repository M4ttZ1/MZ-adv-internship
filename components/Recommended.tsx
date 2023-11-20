import React, { useEffect, useState } from "react";
import Book from "./ui/Book";
import Skeleton from "./ui/Skeleton";
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

export default function Recommend() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="for-you__title">Recommended For You</div>
      <div className="for-you__sub--title">We think you'll like these</div>
      <div className="for-you__recommended--books">
        {!loading ? (
          data.map((data) => (
            <Book
              key={data.id}
              subscriptionRequired={data.subscriptionRequired}
              id={data.id}
              title={data.title}
              author={data.author}
              subTitle={data.subTitle}
              averageRating={data.averageRating}
              imageLink={data.imageLink}
              audioLink={data.audioLink}
              totalRating={data.totalRating}
              keyIdeas={data.keyIdeas}
              type={""}
              status={""}
              summary={""}
              tags={[]}
              bookDescription={""}
              authorDescription={""}
            />
          ))
        ) : (
          <>
            {new Array(5).fill(0).map((_, index) => (
              <div className="for-you__recommended--books-link" key={index}>
                <figure className="book__image--wrapper mb-2">
                  <Skeleton width={172} height={172} borderRadius={0} />
                </figure>
                <div className="recommended__book--title">
                  <Skeleton width={172} height={30} borderRadius={0} />
                </div>
                <div className="recommended__book--author">
                  <Skeleton width={172} height={20} borderRadius={0} />
                </div>
                <div className="recommended__book--sub-title">
                  <Skeleton width={172} height={20} borderRadius={0} />
                </div>
                <div className="recommended__book--details-wrapper">
                  <div className="recommended__book--details">
                    <Skeleton width={172} height={20} borderRadius={0} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
