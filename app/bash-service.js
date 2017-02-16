let jsdom = require('jsdom');
let request = require('request');
let fs = require('fs');

let baseUrl = 'http://bash.im/';

let jQuery = fs.readFileSync('node_modules/jquery/dist/jquery.min.js');

class Service {

    getNew(page) {

        let url;

        if(page)
            url = `${baseUrl}index/${page}`;
        else
            url = baseUrl;

        return this.parseHTML(url);
    }

    getRandom() {
        return this.parseHTML(`${baseUrl}random`);
    }

    vote(id, act) {
        request.post(`${baseUrl}quote/${id}/${act}`, {
            form: {
                quote: id,
                act: act,
            }
        });
    }

    parseHTML(url) {
        return new Promise((resolve, reject) => {
            jsdom.env({
                url: url,
                src: [jQuery],
                done: (error, window) => {
                    if(error) {
                        reject(error);
                        return;
                    }

                    let $ = window.$;

                    let rawQuotes = $('.quote').not('.more');
                    let quotes = [];

                    rawQuotes.each((i, el) => {
                        let element = $(el);

                        if(element.children().length !== 2) {
                            return;
                        }

                        let text = $('.text', element);
                        let actions = $('.actions', element).not('.more');
                        let date = $('.date', actions).text();
                        let votes = parseInt($('.rating', actions).text());
                        let id = $('.id', actions).attr('href').substring(7);

                        quotes.push({
                            id: id,
                            date: date,
                            votes: votes,
                            text: text.html(),
                        });
                    });

                    let currentPage = $('.current > input').val();

                    resolve({
                        page: currentPage,
                        quotes: quotes,
                    });
                }
            });
        });
    }
}

module.exports = new Service();