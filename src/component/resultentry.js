import React from 'react';
import Db from './db';
import BooksContext from './bookscontext';

function ResultEntry(props) {
    return (
        <BooksContext.Consumer>
            {(context) => {
                return (<div className='card m-4'>
                    <div className='row'>
                        <div className='col-md-12 mt-1'>
                            <div className='row'>
                                <div className='col-md-12 title d-flex justify-content-center'>
                                    <h4>{props.book.title}</h4>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h5>{props.book.authors}</h5>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <a href={props.book.link}></a>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <img className="mx-2 float-left" src={props.book.image} alt="bookImage"></img>
                                    <p className='text-justify d-inline'>{props.book.description}.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className=" d-flex justify-content-end">
                                <button className="btn btn-secondary mx-1 my-4" onClick={() => handleView(props.book.link)}>View</button>
                                {props.fromSaved ? getDeleteButton(props, context) : getSaveButton(props, context)}
                            </div>
                        </div>
                    </div>
                </div>);
            }}
        </BooksContext.Consumer>

    )
}

function getSaveButton(props, context) {
    return (<button className="btn btn-primary mx-1 my-4" onClick={() => {
        debugger;
        context.db.save(props.book);
    }}>Save</button>);
}

 function getDeleteButton(props, context) {
    return (<button className="btn btn-primary mx-1 my-4" onClick={async() => {
        debugger;
        await context.db.delete(props.book.id);
        if (context.bookDeleted)
            context.bookDeleted();
    }}>Delete</button>);
}

function handleView(link) {
    if (link)
        window.open(link);
}

export default ResultEntry;