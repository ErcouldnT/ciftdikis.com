<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { getItem } from '../../../../api/itemsApi?client';
	import { shoppingCart } from '../../../../stores';
	import { nanoid } from 'nanoid';

	let productList = $shoppingCart;

	export let data;

	let product;

	onMount(async () => {
		const productData = await getItem(data.slug);
		product = { ...productData };
		// console.log(product);
		if (!product.productName) goto('/');
	});

	const sepeteEkle = () => {
		product.id = nanoid();
		productList.push(product);
		shoppingCart.set(productList);
		// console.log($shoppingCart);
	};
</script>

<svelte:head>
	{#if product}
		<title>Çift Dikiş | {product.productName}</title>
	{/if}
</svelte:head>

{#if product}
	<div in:fly={{ y: 200, duration: 2000 }} class="flex justify-center items-center ">
		<div class="card lg:card-side bg-base-100 shadow-xl max-w-4xl">
			<figure><img class="w-1/2" src={product.imgLink} alt={product.productName} /></figure>
			<div class="card-body">
				<h2 class="card-title">{product.productName}</h2>
				<p>{product.desc}</p>
				<p>Satıcı: <span class="font-bold">{product?.seller?.displayName}</span></p>
				<p class="text-2xl font-bold">{product.price} ₺</p>
				<div class="card-actions justify-end">
					<!-- <button class="btn btn-primary">Sepete ekle</button> -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
					<label on:click={sepeteEkle} for="my-modal-4" class="btn btn-primary">Sepete ekle</label>
				</div>
			</div>
		</div>
	</div>
{/if}
