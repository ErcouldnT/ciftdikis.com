<script>
	import Categories from '$lib/Home/Categories.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	// import { user, isLoggedIn, items } from '../stores';
	import { approvedProducts } from '../stores/products';
	import { allItems } from '../api/itemsApi?client';
	import project from '../config/project';

	// console.log($approvedProducts);

	const goToProduct = (name) => {
		goto(name.trim().replace(' ', '-').toLowerCase());
	};

	onMount(async () => {
		const itemsData = await allItems();
		// const all = [...itemsData];
		// allProducts.set(all);
		const newList = itemsData.filter((product) => {
			return product.approved === true;
		});
		approvedProducts.set(newList);
	});
</script>

<svelte:head>
	<title>{project.name} | {project.slogan}</title>
</svelte:head>

<div class="grid lg:grid-cols-7 grid-cols-1">
	<div class="border rounded-2xl col-span-1">
		<Categories />
	</div>
	<div class="m-auto col-span-5">
		<div class="flex flex-wrap gap-5 justify-center items-center">
			{#each $approvedProducts as item (item.slug)}
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
							<button class="btn btn-primary">Ürüne git</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="border rounded-2xl col-span-1">
		<div>Son eklenen ürünler</div>
		<div>En çok beğenilen ürünler</div>
		<div>En çok görüntülenen ürünler</div>
		<!-- <div>Aynı kategorideki benzer ürünler</div> -->
	</div>
</div>
