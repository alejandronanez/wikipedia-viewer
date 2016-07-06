import 'rx-dom';
import Rx, { Observable } from 'rx';
import fetchJsonp from 'fetch-jsonp';

export function getURL(query) {
	/* eslint-disable no-multi-spaces */
	/* eslint-disable prefer-template */
	return  'http://en.wikipedia.org/w/api.php?' +
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
			'gsrsearch=' + query;
	/* eslint-enable no-multi-spaces */
	/* eslint-enable prefer-template */
}

export function createArticle(searchResult) {
	const {
		title,
		extract
	} = searchResult;

	const article = `
		<header>
			<h2>${title}</h2>
			<p>${extract}</p>
			<a href="https://en.wikipedia.org/wiki/${title.replace(' ', '_')}" target="_blank">See it on wikipedia</a>
		</header>
	`;

	const element = document.createElement('article');
	element.classList = 'pure-u-5-5 article';
	element.innerHTML = article;

	return element;
}

export function makeCall(URL) {
	return Observable
			.just(URL)
			.flatMap(() => Observable.fromPromise(fetchJsonp(URL)))
			.flatMap(response => response.json())
			.map(response => response.query.pages);
}
