
import 'rx-dom';
import Rx from 'rx';

import {
	getURL,
	makeCall,
	searchSuccess,
	searchError
} from 'helpers';

const input = document.querySelector('.js-search');
const formElement = document.querySelector('.js-form');

Rx.DOM
	.keyup(input)
	.pluck('target', 'value')
	.filter((text) => text.length > 3)
	.debounce(500)
	.distinctUntilChanged()
	.map(getURL)
	.subscribe((url) => {
		makeCall(url).subscribe(searchSuccess, searchError);
	});

Rx.DOM.submit(formElement).subscribe((ev) => ev.preventDefault());

// ============================================
// Old way to do things. Left here as reference
// ============================================
//
// const searchStream$ = throttledInput$.flatMap(userSearch => makeCall(getURL(userSearch)));
// searchStream$.subscribe(searchSuccess, searchError);
