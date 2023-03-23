"use client"
import React, { ReactElement, useState } from 'react'

interface ISearchContext {
    searchString: string 
    setSearchString: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = React.createContext<ISearchContext | undefined>(undefined)

export default function SearchProvider({children}: {children: ReactElement}) {
  const [searchString, setSearchString] = useState("")

  return (
    <SearchContext.Provider value={{searchString: searchString, setSearchString}}>
     {children}
    </SearchContext.Provider>
  )
}
