<script>
	import '../app.postcss';
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';

	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth?client';
	import { collection, getDocs } from 'firebase/firestore?client';
	import { auth, db } from '../firebase?client';
	import { user, isLoggedIn } from '../stores';
	import { isAdmin, isSeller } from '../stores/user';

	const admins = [];
	const sellers = [];

	onMount(async () => {
		// for any user
		onAuthStateChanged(auth, (authUser) => {
			$user = authUser;
			$isLoggedIn = !!authUser;
		});

		// for admins
		const queryAdminsSnapshot = await getDocs(collection(db, 'adminler'));
		queryAdminsSnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			admins.push(doc.data());
		});
		admins.forEach((admin) => {
			if (admin.email === $user.email) {
				$isAdmin = true;
			}
		});

		// for sellers
		const querySellersSnapshot = await getDocs(collection(db, 'satıcılar'));
		querySellersSnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			sellers.push(doc.data());
		});
		sellers.forEach((seller) => {
			if (seller.email === $user.email) {
				$isSeller = true;
			}
		});
	});
</script>

<Header />
<slot />
<Footer />
