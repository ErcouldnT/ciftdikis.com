<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Categories from '$lib/Home/Categories.svelte';
	// import { user, isLoggedIn, items } from '../stores';
	import { isAdmin, isSeller, storeName } from '../../stores/user';
	import { approvedProducts, homePageProductList } from '../../stores/products';
	import { favProductList } from '../../stores';
	import { allItems } from '../../api/itemsApi?client';
	import project from '../../config/project';

	const favoriyeAl = (item) => {
		const newList = $favProductList;
		newList.push(item);
		favProductList.set(newList);
		// console.log($favoriteProducts);
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

{#if $homePageProductList.length >= 1}
	<div>
		<div class="flex flex-wrap gap-5 justify-center items-center">
			{#each $homePageProductList as item (item.id)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- transition:fade={{ duration: 250 }} -->
				<a
					in:fly={{ y: 200, duration: 2000 }}
					href={'/' + item.category + '/' + item.slug}
					class="hover:bg-primary card w-96 bg-base-100 shadow-xl cursor-pointer mb-7"
				>
					<figure><img class="h-72 rounded-xl" src={item.imgLink} alt="Ürün" /></figure>
					<div class="card-body">
						<h2 class="card-title">{item.productName}</h2>
						<p class="font-bold text-2xl">{item.price} ₺</p>
						<p>
							Satıcı: <span class="font-bold">{item.storeName || item.seller.displayName}</span>
						</p>
						<div class="card-actions justify-end">
							<div class="btn btn-ghost btn-circle">
								<i
									on:click={() => {
										favoriyeAl(item);
									}}
									class="fa fa-heart-o text-3xl text-accent p-2"
								/>
							</div>
							<button class="btn btn-primary">Ürüne git</button>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
{:else if $homePageProductList.length === 0}
	<div class="text-center p-10 italic">Ürünler yüklenirken lütfen bekleyin...</div>
{:else}
	<!-- TODO: Ürün yoksa "bulunamadı" yazacak. -->
	<div class="text-center p-10 italic">Ürün bulunamadı.</div>
{/if}
