<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getItem } from '../../api/itemsApi?client';
	// import { user, isLoggedIn } from '../../stores';

	export let data;

	let product;

	onMount(async () => {
		const productData = await getItem(data.productName);
		product = { ...productData };
		// console.log(product);
		if (!product.productName) goto('/');
	});
</script>

<svelte:head>
	{#if product}
		<title>Çift Dikiş | {product.productName}</title>
	{/if}
</svelte:head>

{#if product}
	<div class="flex justify-center items-center ">
		<div class="card lg:card-side bg-base-100 shadow-xl max-w-4xl">
			<figure><img class="w-1/2" src={product.imgLink} alt={product.productName} /></figure>
			<div class="card-body">
				<h2 class="card-title">{product.productName}</h2>
				<p>{product.desc}</p>
				<p>Satıcı: <span class="font-bold">{product?.seller?.displayName}</span></p>
				<p class="text-2xl font-bold">{product.price} ₺</p>
				<div class="card-actions justify-end">
					<!-- <button class="btn btn-primary">Sepete ekle</button> -->
					<label for="my-modal-4" class="btn btn-primary">Sepete ekle</label>
				</div>
			</div>
		</div>
	</div>
{/if}
