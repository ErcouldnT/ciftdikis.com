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
	import { approvedProducts, allProducts } from '../stores/products';
	import { allItems } from '../api/itemsApi?client';

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
				isAdmin.set(true);
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
				isSeller.set(true);
			}
		});

		const itemsData = await allItems();
		const all = [...itemsData];
		allProducts.set(all);
		$approvedProducts = itemsData.filter((product) => {
			return product.approved === true;
		});
	});
</script>

<Header />
<slot />
<Footer />
