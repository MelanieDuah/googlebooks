import React from 'react';
import BooksContext from './bookscontext';
import axios from 'axios';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        }

    }

    async handleSearch() {
        try {
            let searchValue = this.state.userInput;
            let googlebooksurl = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=AIzaSyASkFG1ohmop2R-htS56peQ6OZYuR5Juh0`;
            let booksresults = await axios.get(googlebooksurl);
            let books = [];
            for (let result of booksresults.data.items) {
                let book = {
                    title: result.volumeInfo.title,
                    authors: result.volumeInfo.authors,
                    description: result.volumeInfo.description,
                    link: result.volumeInfo.previewLink
                };
                if (result.volumeInfo.imageLinks)
                    book.image = result.volumeInfo.imageLinks.smallThumbnail;

                books.push(book);
            }

            if (this.context.newSearchResultsReceived)
                this.context.newSearchResultsReceived(books);
        } catch (error) {
            console.error(error);
        }
    }

    ddd() {


    }

    render() {
        return (
            <div className="row searchbackground">
                <div className="col-md-8 text">
                    <h3>Search for and save books of your interest</h3>
                </div>
                <div className="col-md-4 searching">
                    <div className="form-inline my-2 my-lg-0 d-flex align-middle justify-content-end">
                        <input className="form-control align-middle" onChange={(event) => this.setState({ userInput: event.target.value })} type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-gray align-middle" onClick={() => this.handleSearch()}>Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

SearchBox.contextType = BooksContext;

export default SearchBox;