<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { getItem } from '../../../../api/itemsApi?client';
	import { shoppingCart, favProductList } from '../../../../stores';
	import { nanoid } from 'nanoid';
	import Rating from '../../../../components/Rating.svelte';

	let productList = $shoppingCart;
	let favList = $favProductList;

	export let data;

	let product;
	let selectedColor;
	let selectedSize;
	let comment;
	let comments = [{ text: 'test', id: 1 }];

	// let pictureSelected = false;
	let imageSelected;

	// $: console.log(comments);

	onMount(async () => {
		const productData = await getItem(data.slug);
		product = { ...productData };
		// console.log(product);
		if (!product.productName) goto('/');

		// console.log(product.imgLink);
		// Fix for old products.
		if (typeof product.imgLink === 'string') {
			product.imgLink = [product.imgLink];
		}
	});

	const sepeteEkle = () => {
		// if (selectedColor.toLowerCase().includes('renk')) return;
		// if (selectedSize.toLowerCase().includes('beden')) return;

		product.cartId = nanoid();
		product.color = selectedColor;
		product.size = selectedSize;

		productList.push(product);
		shoppingCart.set(productList);
		// console.log($shoppingCart);
		// console.log(product);
	};

	const favorilereEkle = () => {
		product.favId = nanoid();
		product.color = selectedColor;
		product.size = selectedSize;

		favList.push(product);
		favProductList.set(favList);
	};

	const yorumGönder = () => {
		if (!comment) return;
		comments.push({ text: comment.trim(), id: 2 });
		comment = '';
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
			<div class="col-span-1 m-auto w-full h-full p-5">
				<!-- <div class="h-96 carousel carousel-vertical rounded-box">
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
					</div> -->

				{#if !imageSelected && product.imgLink.length > 1}
				<div class="flex justify-center items-center">
					<div class="h-96 carousel carousel-vertical rounded-box">
						{#each product.imgLink as image}
							<div class="carousel-item h-full justify-center">
								<!-- class="w-full" for img tag -->
								<img class="rounded-box border-2 border-primary" src={image} alt="" />
							</div>
						{/each}
					</div>
				</div>
				{:else if product.imgLink.length === 1}
					<img class="rounded-box border-2 border-primary" src={product.imgLink[0]} alt="" />
				{:else}
					<img class="rounded-box border-2 border-primary w-full object-contain" src={imageSelected} alt="" />
				{/if}

				<!-- Küçük resimler -->
				{#if product.imgLink.length > 1}
					<!-- <p class="italic font-light text-center p-5">
							{product.imgLink.length} adet görsel mevcut.
						</p> -->

					<div class="flex flex-wrap justify-center items-center gap-2 p-5">
						{#each product.imgLink as imageSrc}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<img
								on:click={() => {
									imageSelected = imageSrc;
								}}
								class="h-16 w-16 cursor-pointer rounded object-contain"
								src={imageSrc}
								alt=""
							/>
						{/each}
					</div>
				{/if}

				<!-- <div class="h-96 carousel carousel-vertical rounded-box">
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div> 
						<div class="carousel-item h-full">
							<img src="https://placeimg.com/256/400/arch" />
						</div>
					</div> -->
			</div>
			<div class="col-span-1">
				<div class="absolute right-0 p-5">
					<div class="text-sm font-light">Satıcı:</div>
					<div class="uppercase">{product.seller.displayName}</div>
					<Rating />
				</div>
				<div class="p-10 mt-10">
					<div class="text-2xl uppercase">{product.productName}</div>
					<div class="text-3xl">{product.price} ₺</div>
					<div class="text-sm font-light">
						Stok durumu: <span class="font-normal">{product.amount || 'Mevcut'}</span>
					</div>
					<!-- <div class="text-sm font-light">İlan tarihi: <span class="font-normal">{product.createdAt}</span></div> -->
					<div class="my-5">
						<select bind:value={selectedColor} class="select select-primary w-full max-w-xs">
							<!-- <option disabled selected>Renk</option> -->
							{#each product.colors || [] as color}
								<option>{color}</option>
							{/each}
						</select>
					</div>
					<div class="my-5">
						<select bind:value={selectedSize} class="select select-primary w-full max-w-xs">
							<!-- <option disabled selected>Beden</option> -->
							{#each product.sizes || [] as size}
								<option>{size}</option>
							{/each}
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
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div on:click={favorilereEkle} class="gap-2 btn btn-error btn-outline">
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
			<div class="p-5 w-full">
				<div class="text-center mb-2">Ürün yorumları</div>
				<div>
					{#each comments as com (com.id)}
						<div>{com.text}</div>
					{/each}
				</div>
				<form class="flex gap-1 my-2" on:submit|preventDefault={yorumGönder}>
					<input
						bind:value={comment}
						class="w-full rounded-xl"
						type="text"
						placeholder="Yorumunuzu buraya yazabilirsiniz..."
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div on:click={yorumGönder} class="btn btn-primary">Gönder</div>
				</form>
			</div>
			<div class="p-5 m-auto">Satıcıya sorulan sorular</div>
		</div>
	</div>
{/if}
