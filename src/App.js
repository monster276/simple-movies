import { Fragment } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
// https://api.themoviedb.org/3/movie/now_playing?api_key=c9b97a35a8e0dabdc3c7b129bc0c144b
import 'swiper/scss'
import Baner from './components/banner/Baner'

import Main from './components/layout/Main'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import MoviesDetail from './pages/MoviesDetail'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Baner></Baner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movie/:movieID"
            element={<MoviesDetail></MoviesDetail>}
          ></Route>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
