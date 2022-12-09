<script>
	export let data;

	const categoryKey = data.categoryKey;
	const category = data.category;

	let itemsList = [];

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user, isLoggedIn, items } from '../../../stores';
	import { allItems } from '../../../api/itemsApi?client';

	onMount(async () => {
		const itemsData = await allItems(); // Add that to store
		const bütünÜrünler = [...itemsData];
		itemsList = bütünÜrünler.filter((item) => {
			return item.category === categoryKey;
		});
		// console.log(itemsList);
	});

	const goToProduct = (name) => {
		goto(name.trim().replace(' ', '-').toLowerCase());
	};
</script>

<svelte:head>
	<title>Çift Dikiş | {category}</title>
</svelte:head>

<!-- <div class="text-center text-2xl">
	Merhaba ben {category} sayfası!
</div> -->

<div class="flex flex-wrap gap-5 justify-center items-center">
	{#each itemsList as item}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={goToProduct(item.productName)}
			class="card w-96 bg-base-100 shadow-xl cursor-pointer mb-7"
		>
			<figure><img class="h-72 rounded-xl" src={item.imgLink} alt="Ürün" /></figure>
			<div class="card-body">
				<h2 class="card-title">{item.productName}</h2>
				<p class="font-bold text-2xl">{item.price}₺</p>
				<p>Satıcı: <span class="font-bold">{item.seller.displayName}</span></p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">İncele</button>
				</div>
			</div>
		</div>
	{/each}
</div>
