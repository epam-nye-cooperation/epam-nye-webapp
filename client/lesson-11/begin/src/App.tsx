import React from "react"

import { NetflixRoulettePage } from "./layout/netflix-roulette-page";
import { PageHeader } from "./components/page-header/page-header";
import { MovieListPage } from "./components/pages/movie-list-page";

export const App = () => (
  <NetflixRoulettePage>
    <PageHeader />
    <MovieListPage />
  </NetflixRoulettePage>
)
