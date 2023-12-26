import { writable } from 'svelte/store';

// Save stroes to local storage
function localStore(key, initialValue) {
	const initial =
		typeof window !== 'undefined' && localStorage.getItem(key)
			? JSON.parse(localStorage.getItem(key))
			: initialValue;
	const store = writable(initial);

	store.subscribe((value) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return store;
}

export const pipedInstances = localStore('pipedInstances', []);
export const videoHistory = localStore('videoHistory', []);
