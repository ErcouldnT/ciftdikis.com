import { writable } from 'svelte/store';
// import { browser } from '$app/environment';

export const isAdmin = writable(false);
export const isSeller = writable(false);

// isLoggedIn will be here.
