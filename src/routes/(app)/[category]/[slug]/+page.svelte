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
	// let color;
	// let size;

	const colorPicker = (color) => {
		console.log(color);
		product.color = color;
	};

	const sizePicker = (size) => {
		console.log(size);
		product.size = size;
	};

	onMount(async () => {
		const productData = await getItem(data.slug);
		product = { ...productData };
		// console.log(product);
		if (!product.productName) goto('/');
	});

	const sepeteEkle = () => {
		product.cartId = nanoid();
		productList.push(product);
		shoppingCart.set(productList);
		// console.log($shoppingCart);
		// console.log(product);
	};
</script>

<svelte:head>
	{#if product}
		<title>Çift Dikiş | {product.productName}</title>
	{/if}
</svelte:head>

{#if product}
	<div in:fly={{ y: 200, duration: 2000 }} class="flex justify-center items-center ">
		<div class="border card grid grid-cols-2 w-[1000px]">
			<div class="col-span-1 m-auto">
				<div class="p-5">
					<img class="rounded-xl border-2 border-primary" src={product.imgLink} alt="" />
				</div>
			</div>
			<div class="col-span-1">
				<div class="absolute right-0 p-5">
					<div class="text-sm font-light">Satıcı:</div>
					<div class="uppercase">{product.seller.displayName}</div>
				</div>
				<div class="p-10 mt-10">
					<div class="text-2xl uppercase">{product.productName}</div>
					<div class="text-3xl">{Number(product.price).toFixed(2)} ₺</div>
					<div class="my-5">
						<select class="select select-primary w-full max-w-xs">
							<option disabled selected>Renk</option>
							<option
								on:click={() => {
									colorPicker('siyah');
								}}>Siyah</option
							>
							<option
								on:click={() => {
									colorPicker('gri');
								}}>Gri</option
							>
							<option
								on:click={() => {
									colorPicker('lacivert');
								}}>Lacivert</option
							>
							<option
								on:click={() => {
									colorPicker('kırmızı');
								}}>Kırmızı</option
							>
						</select>
					</div>
					<div class="my-5">
						<select class="select select-primary w-full max-w-xs">
							<option disabled selected>Beden</option>
							<option
								on:click={() => {
									sizePicker('S');
								}}>S</option
							>
							<option
								on:click={() => {
									sizePicker('M');
								}}>M</option
							>
							<option
								on:click={() => {
									sizePicker('L');
								}}>L</option
							>
							<option
								on:click={() => {
									sizePicker('XL');
								}}>XL</option
							>
						</select>
					</div>
					<div class="my-5">
						<div class="text-sm font-light">Ürün Açıklaması:</div>
						<div class="">{product.desc}</div>
					</div>
					<div class="grid gap-2">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<label on:click={sepeteEkle} for="my-modal-4" class="gap-2 btn btn-primary">
							<i class="fa fa-shopping-basket" aria-hidden="true" />
							<div>Sepete ekle</div>
						</label>
						<div class="gap-2 btn btn-error btn-outline">
							<i class="fa fa-heart" aria-hidden="true" />
							<div>Favorilere ekle</div>
						</div>
						<div class="gap-2 btn btn-success btn-outline">
							<i class="fa fa-question-circle" aria-hidden="true" />
							<div>Satıcıya soru sor</div>
						</div>
					</div>
				</div>
			</div>
			<div class="p-5 m-auto">Ürün yorumları</div>
			<div class="p-5 m-auto">Satıcıya sorulan sorular</div>
		</div>
	</div>
{/if}
