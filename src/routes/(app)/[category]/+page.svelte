<script>
	export let data;

	const categoryKey = data.categoryKey;
	const category = data.category;

	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { approvedProducts } from '../../../stores/products';
	import { category as categoryName } from '../../../stores/category';
	import { isAdmin, isSeller, storeName } from '../../../stores/user';
	import kategoriler from '../../../config/kategoriler';

	let contentIsLoaded = false;
	let kategoridekiÜrünler = [];

	if (!$categoryName) {
		categoryName.set(categoryKey);
	}

	$: {
		contentIsLoaded = false;
		kategoridekiÜrünler = [];
		kategoridekiÜrünler = $approvedProducts.filter((item) => {
			return item.category === $categoryName && item.approved === true;
		});
		contentIsLoaded = true;
	}
</script>

<svelte:head>
	<title>Çift Dikiş | {kategoriler[$categoryName]}</title>
</svelte:head>

<!-- <div class="text-center text-2xl">
	Merhaba ben {category} sayfası!
</div> -->

{#if contentIsLoaded}
	<!-- content here -->
	<div class="flex flex-wrap gap-5 justify-center items-center">
		{#each kategoridekiÜrünler as item (item.id)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				in:fly={{ y: 200, duration: 2000 }}
				on:click={() => {
					goto(`/${item.category}/${item.slug}`);
				}}
				class="card w-96 bg-base-100 shadow-xl cursor-pointer mb-7"
			>
				<figure><img class="h-72 rounded-xl" src={item.imgLink} alt="Ürün" /></figure>
				<div class="card-body">
					<h2 class="card-title">{item.productName}</h2>
					<p class="font-bold text-2xl">{item.price}₺</p>
					<p>
						Satıcı: <span class="font-bold">{item.storeName || item.seller.displayName}</span>
					</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">İncele</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else if contentIsLoaded && kategoridekiÜrünler.length === 0}
	<div class="italic">Ürün bulunamadı.</div>
{/if}
