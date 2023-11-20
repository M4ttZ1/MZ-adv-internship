import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import SearchBook from "./ui/SearchBook";
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
export default function SearchBar() {
  const [search, setSearch] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Book[]>();
  function handleDelete() {
    if (search.length !== 0) {
      setSearch("");
    }
  }
  useEffect(() => {
    if (!search) {
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => {
        const fetchData = async () => {
          const response = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
          );
          const json = await response.json();
          setData(json);
          setIsLoading(false);
        };
        fetchData();
      }, 1000);
    }
  }, [search]);
  return (
    <div className="search__background">
      <div className="search__wrapper relative">
        <figure>
          <img src="" alt="" />
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                value={search}
                className="search__input"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for books"
                type="text"
              />
              <div className="search__icon" onClick={handleDelete}>
                {search.length === 0 ? <BiSearch /> : <FaTimes />}
              </div>
            </div>
          </div>
        </div>
        {search &&
          (!isLoading ? (
            data?.length !== 0 ? (
              <div className="search__books--wrapper">
                {data?.map((data) => (
                  <SearchBook
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
                ))}
              </div>
            ) : (
              <div className="search__books--wrapper">No books found</div>
            )
          ) : (
            <div className="search__books--wrapper">
              {new Array(4).fill(0).map((_, index) => (
                <div className="p-2" key={index}>
                  <Skeleton width="100%" height={120} borderRadius={0} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}