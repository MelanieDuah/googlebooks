import React from 'react';
import Header from './component/head';
import SearchBox from './component/searchbox';
import BookResults from './component/bookresults';
import Footer from './component/footer';
import BooksContext from './component/bookscontext';
import Db from './component/db';


export default function App() {
  return (
    <BooksContext.Provider value={
      {
        newSearchResultsReceived: () => { },
        db : Db.createDb('booksdb', 'books'),
        bookDeleted: () =>{}
      }}>
      <div>
        <Header />
        <SearchBox />
        <BookResults />
        <Footer />
      </div>
    </BooksContext.Provider>
  );
}

