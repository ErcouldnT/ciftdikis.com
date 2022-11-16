import { writable } from 'svelte/store';

export const items = writable([]);
export const shoppingCart = writable([]);

export const user = writable({});
export const isLoggedIn = writable(false);
