import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string;
}

export default function SearchPage() {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
      searchQuery:"",
    })
    const { results, isLoading } = useSearchRestaurants(searchState, city);

    
    const setSearchQuery = (searchFormData: SearchForm) => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: searchFormData.searchQuery,
      }))
    } //Fin de setSearchQuery

    const resetSearch = () => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: "",
      }))
    }//Fin de resetSearch

    if (isLoading) {
        <span>Loading...</span>
    }
    if (!results?.data || !city) {
        return <span>No hay resultados</span>
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">Insertar tipos de cocinas aquí</div>
        <div id="main-content"
             className="flex flex-col gap-5">
              <SearchBar 
                         searchQuery={searchState.searchQuery}
                         onSubmit={setSearchQuery}
                         placeHolder="Busqueda por cocina o nombre del restaurante"
                         onReset={resetSearch}
              />
                <SearchResultsInfo
                  total={results.pagination.total}
                  city={city}
                />
                {
                  results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant}/>
                  ))
                }
        </div>
    </div>
  )
}
