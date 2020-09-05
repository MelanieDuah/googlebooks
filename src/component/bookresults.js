import React from 'react';
import ResultEntry from './resultentry';
import BooksContext from './bookscontext';

class BookResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookresults: [],
            fromSaved: false
        }
    }

    componentDidMount() {
        if (this.context)
            this.context.newSearchResultsReceived = (results, fromSaved) => this.onNewSearchResultsReceived(results, fromSaved);
    }

    onNewSearchResultsReceived(results, fromSaved) {
        let newState = {
            bookresults: results,
            fromSaved: fromSaved
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 results">
                    {this.state.bookresults.map((book, index) => {
                        return <ResultEntry key={index} index={index} book={book} fromSaved={this.state.fromSaved} />
                    })}
                </div>
            </div>
        );
    }
}

BookResults.contextType = BooksContext;

export default BookResults;