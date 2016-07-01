
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
						.flatMap(response => response.json());

responseStream.subscribe(({ query: { pages } }) => console.log(pages));
/* eslint-enable no-console */
