import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const items = writable([]);

// const stored = localStorage.cart;

export const shoppingCart = writable(browser ? JSON.parse(localStorage.getItem('cart')) : [] || []);

shoppingCart.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('cart', JSON.stringify(value));
		// content.subscribe((value) => localStorage.content = value)
	}
});

export const user = writable({});
export const isLoggedIn = writable(false);
