<script>
	import { onMount } from 'svelte';
	import { user, isLoggedIn, items } from '../../stores';
	// import { allItems } from '../api/itemsApi?client';

	// onMount(async () => {
	// 	const itemsData = await allItems(); // Add that to store
	// 	const products = [...itemsData];
	// });

	const controlProducts = $items.filter((product) => {
		return product.approved === false;
	});
</script>

<div class="text-center">
	<div>Yönetim Merkezi</div>

	{#each controlProducts as p}
		<div>{p.productName}</div>
	{/each}
</div>
