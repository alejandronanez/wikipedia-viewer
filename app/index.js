
import 'rx-dom';
import Rx from 'rx';

import {
	getURL,
	createArticle,
	makeCall
} from 'helpers';

const input = document.querySelector('.js-search');
const throttledInput$ = Rx.DOM
						.keyup(input)
						.pluck('target', 'value')
						.filter((text) => text.length > 3)
						.debounce(500)
						.distinctUntilChanged();

const searchStream$ = throttledInput$.flatMapLatest(userSearch => makeCall(getURL(userSearch)));

searchStream$.subscribe((articles) => {
	const container = document.querySelector('.js-article-container');
	container.innerHTML = '';

	Object.keys(articles).forEach((article) => {
		container.appendChild(createArticle(articles[article]));
	});
});
