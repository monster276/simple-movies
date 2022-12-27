import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'
import useSWR from 'swr'
import MovieCard from '../components/movies/MovieCard'
import { apiKey, fetcher } from '../config'
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const MoviesDetail = () => {
  const { movieID } = useParams()
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`,
    fetcher,
  )
  if (!data) return null
  const { backdrop_path, poster_path, title, genres, overview } = data
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10 ">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-center text-4xl font-bold text-white">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex item-center gap-x-5 mb-10 justify-center ">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border border-primary text-primary rounded-lg"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="mb-10 text-center leading-relaxed max-w-[600px] mx-auto">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  )
}
function MovieCredits() {
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
  const { movieID } = useParams()
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`,
    fetcher,
  )
  if (!data) return null
  const { cast } = data
  if (!cast || cast.length <= 0) return null
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl mb-10">Cats</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.splice(0, 4).map((item) => (
          <div className="cats-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] rounded-lg object-cover"
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieVideos() {
  const { movieID } = useParams()
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`,
    fetcher,
  )
  if (!data) return null
  const { results } = data
  if (!results || results.length <= 0) return null
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.splice(0, 5).map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 inline-block bg-secondary text-white">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="1280"
                height="720"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Crying Again [Vietsub] (OST THE HEIRS) - Moon Myung Jin"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                className="h-full w-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieSimilar() {
  const { movieID } = useParams()
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${apiKey}`,
    fetcher,
  )
  if (!data) return null
  const { results } = data
  if (!results || results.length <= 0) return null
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}
export default MoviesDetail

