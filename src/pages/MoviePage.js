import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import useSWR from 'swr'
import MovieCard from '../components/movies/MovieCard'
import { fetcher } from '../config'
import useDebounce from '../hook/useDebounce'
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const MoviePage = () => {
  
  const [nextPage, setNextPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=c9b97a35a8e0dabdc3c7b129bc0c144b&page=${nextPage}`,
  )
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }
  const filterDebounce = useDebounce(filter, 500)
  const { data, error } = useSWR(url, fetcher)

  const loading = !data && !error
  
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=c9b97a35a8e0dabdc3c7b129bc0c144b&query=${filterDebounce}&page=${nextPage}`,
      )
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=c9b97a35a8e0dabdc3c7b129bc0c144b&page=${nextPage}`,
      )
    }
  }, [filterDebounce, nextPage])
  if (!data) return null
  const movies = data?.results || []
  const pageCount = 5
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here"
            onChange={handleFilter}
          />
        </div>
        <button className="p-4 bg-primary text-white">Search</button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      
      <div className="flex item-center justify-center mt-10 gap-x-5 ">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setNextPage(nextPage - 1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            onClick={() => setNextPage(index + 1)}
            className="cursor-pointer inline-block py-2 px-4 bg-white text-slate-900 leading-none rounded "
          >
            {index + 1}
          </span>
        ))}

        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setNextPage(nextPage + 1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default MoviePage
