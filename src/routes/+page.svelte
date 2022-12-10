<script>
	import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';
	// import { user, isLoggedIn, items } from '../stores';
	import { approvedProducts } from '../stores/products';
	// import { allItems } from '../api/itemsApi?client';
	import project from '../config/project';

	const goToProduct = (name) => {
		goto(name.trim().replace(' ', '-').toLowerCase());
	};
</script>

<svelte:head>
	<title>{project.name} | {project.slogan}</title>
</svelte:head>

<div class="flex flex-wrap gap-5 justify-center items-center">
	{#each $approvedProducts as item}
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
