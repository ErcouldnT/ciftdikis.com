<script>
	import '../app.postcss';
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';

	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth?client';
	import { auth } from '../firebase?client';
	import { user, isLoggedIn } from '../stores';

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
