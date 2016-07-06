
/* eslint-disable no-console */
import { Observable } from 'rx';
import fetchJsonp from 'fetch-jsonp';

const URL = 'http://en.wikipedia.org/w/api.php?' +
			'format=json&' +
			'action=query&' +
			'generator=search&' +
			'gsrnamespace=0&' +
			'gsrlimit=10&' +
			'prop=pageimages|extracts&' +
			'pilimit=max&' +
			'exintro&' +
			'explaintext&' +
			'exsentences=1&' +
			'exlimit=max&' +
			'callback=?&' +
			'gsrsearch=javascript';

const requestStream = Observable.just(URL);
const responseStream = requestStream
						.flatMap(() => Observable.fromPromise(fetchJsonp(URL)))
						.flatMap(response => response.json())
						.map(response => response.query.pages);


function createArticle(searchResult) {
	const {
		title,
		extract
	} = searchResult;

	const article = `
		<header>
			<h2>${title}</h2>
			<p>${extract}</p>
			<a href="http://en.wikipedia.org/wiki/${title.replace(' ', '_')}" target="_blank">See it on wikipedia</a>
		</header>
	`;

	const element = document.createElement('article');
	element.classList = 'pure-u-5-5 article';
	element.innerHTML = article;

	return element;
}

responseStream.subscribe((articles) => {
	const container = document.querySelector('.article-container');

	Object.keys(articles).forEach((article) => {
		container.appendChild(createArticle(articles[article]));
	});
});
/* eslint-enable no-console */
