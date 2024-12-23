import React from "react";
import AllPosts from "./AllPosts";
import useGetAllPosts from "../Hooks/useGetAllPosts";
import { useSelector } from "react-redux";

function Home() {
  const { allposts } = useSelector((store) => store.post);
  useGetAllPosts();
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {allposts.map((item, index) => {
            return <AllPosts key={item._id} items={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
