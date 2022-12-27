import React, { useState } from 'react'
import MovieCard from './MovieCard'
import { SwiperSlide, Swiper } from 'swiper/react'
import useSWR from 'swr'
import { fetcher } from '../../config'

const MovieList = ({ type = 'now_playing' }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=c9b97a35a8e0dabdc3c7b129bc0c144b`,
    fetcher,
  )
  const movies = data?.results || []
  return (
    <div className="movie-list">
      <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default MovieList
