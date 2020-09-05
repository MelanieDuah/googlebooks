const express = require('express');
const Googlebook = require('../model/googlemodel');
const axios = require('axios');

class GoogleController {
    constructor(app) {
        this.app = app;
    }

    async getBooks(request, response) {
        let title = request.query.title;
        let googlebooksurl = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyASkFG1ohmop2R-htS56peQ6OZYuR5Juh0`;

        try {

            let booksresults = await axios.get(googlebooksurl);
            let books = [];
            for (let result of booksresults.data.items) {
                let book = {
                    title: result.volumeInfo.title,
                    authors: result.volumeInfo.authors,
                    description: result.volumeInfo.description,
                    link: result.volumeInfo.previewLink
                };
                if(result.volumeInfo.imageLinks)
                   book.image =result.volumeInfo.imageLinks.smallThumbnail;

                books.push(book);
            }
            
            response.status(200).json(books);
        } catch (error) {
            console.error(error);
        }
    }

    async booksSaving(request, response) {
        let authors = request.body.authors;
        let description = request.body.description;
        let image = request.body.image;
        let link = request.body.link;
        let title = request.body.title;

        let result = await this.save(authors, description, image, link, title);
        response.json(result);
    }

    async booksDelete(request, response) {
        let id = request.body.id;
        try {
            await this.deleteById(id);
            response.json({ sucess: 'book deleted' })
        }
        catch (error) {
            response.status(400).json({ error: 'unable to delete book' });
        }
    }

    createRoutes() {
        this.app.get('/api/books', (request, response) => this.getBooks(request, response));
        this.app.post('/api/books', (request, response) => this.booksSaving(request, response));
        this.app.delete('/api/books/:id', (request, response) => this.booksDelete(request, response));
    }
}

module.exports = GoogleController;