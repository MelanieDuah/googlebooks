import React from 'react';
import BooksContext from './bookscontext';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookresults: [],
            fromSaved: false
        }
    }

    componentDidMount() {
        if (this.context)
            this.context.bookDeleted = () => this.showSavedbooks();

    }

    showSavedbooks() {
        this.context.db.getAll((books) => {
            if (this.context.newSearchResultsReceived)
                this.context.newSearchResultsReceived(books, true);
        });
    }
    render(){
        return (
            <div>
                <header className="row searchbackground">
                    <div className="col-md-12 starter">
                        <nav className="navbar navbar-expand-lg">
                            <a className=" navbar googlebook" href="./bookresults">Google Books</a>
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <button className="navbar search btn btn-link">Search</button>
                                <button className="navbar save btn btn-link" onClick={() => this.showSavedbooks()}>Saved books</button>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        );
    }
}

Header.contextType = BooksContext;

export default Header;