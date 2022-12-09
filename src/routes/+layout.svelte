<script>
	import '../app.postcss';
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';

	import { onMount } from 'svelte';
	import { user, isLoggedIn } from '../stores';
	import { auth } from '../firebase?client';
	import { onAuthStateChanged } from 'firebase/auth?client';

	// console.log($user);

	onMount(() => {
		onAuthStateChanged(auth, (authUser) => {
			$user = authUser;
			$isLoggedIn = !!authUser;
		});
	});
</script>

<Header />
<slot />
<Footer />
