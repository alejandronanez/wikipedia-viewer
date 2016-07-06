
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

const throttledInput$ = Rx.DOM
						.keyup(input)
						.pluck('target', 'value')
						.filter((text) => text.length > 3)
						.debounce(500)
						.distinctUntilChanged();

Rx.DOM.submit(formElement).subscribe((ev) => ev.preventDefault());

const searchStream$ = throttledInput$.flatMapLatest(userSearch => makeCall(getURL(userSearch)));

searchStream$.subscribe(searchSuccess, searchError);
