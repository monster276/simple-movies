import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../config'
import { SwiperSlide, Swiper } from 'swiper/react'

const Baner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=c9b97a35a8e0dabdc3c7b129bc0c144b`,
    fetcher,
  )
  const movies = data?.results || []
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={'true'} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}
function BannerItem({ item }) {
  const { title, poster_path } = item
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full rounded-lg object-top object-cover"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-3">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Advanture
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Advanture
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Advanture
          </span>
        </div>
        <button className="py-3 px-6 rounded-lg bg-primary font font-medium">
          Watch Now
        </button>
      </div>
    </div>
  )
}
export default Baner
