import React from "react";

export default function Film(props) {
  const { film } = props;
  return (
    <article className="flex flex-col dark:bg-coolGray-900 mr-3 pb-8">
      <div
        style={{
          background: `url(${film.hinhAnh}) ,url(https://picsum.photos/300)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <a href="#" aria-label="Te nulla oportere reprimique his dolorum">
          <img
            alt={film.maPhim}
            className="object-cover w-full h-60 dark:bg-coolGray-500 opacity-0"
            src={film.hinhAnh}
          />
        </a>
      </div>
      <div className="h-36">
        <div className="flex flex-col flex-1 p-6">
          <a href="#" aria-label="Te nulla oportere reprimique his dolorum" />
          <a
            href="#"
            className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400 h-10"
          >
            {film.tenPhim}
          </a>
          <h3 className="flex-1 py-2 text-lg font-semibold leading-snug h-10">
            {film.moTa.length > 100 ? (
              <span>{film.moTa.slice(0, 100)}...</span>
            ) : (
              <span>{film.moTa}</span>
            )}
          </h3>
        </div>
      </div>
    </article>
  );
}
