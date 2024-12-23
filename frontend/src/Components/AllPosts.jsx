import React from "react";

function AllPosts({ items }) {
  const createdDate = new Date(items.createdAt);

  const day = createdDate.getDate();
  const month = createdDate.toLocaleString("default", { month: "long" });
  const year = createdDate.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800">{items.title}</h2>
      <p className="text-gray-600 mt-2 break-words">{items.description}</p>
      <div className="text-sm text-gray-500 mt-4">
        <p>{formattedDate}</p>
        <p>
          Author:{" "}
          <span className="text-black">{items?.created_by?.fullName}</span>
        </p>
      </div>
    </div>
  );
}

export default AllPosts;
