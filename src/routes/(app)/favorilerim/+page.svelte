<script>
	import { goto } from '$app/navigation';
	import { favProductList } from './../../../stores.js';
	import RemoveButton from '../../../components/RemoveButton.svelte';

	const removeItem = (item) => {
		const result = $favProductList.filter((product) => product.favId !== item.favId);
		favProductList.set(result);
	};
</script>

{#if $favProductList.length}
	<div class="flex flex-wrap justify-center items-center p-5">
		{#each $favProductList as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="w-[250px] m-10 cursor-pointer relative border p-2 rounded-xl">
				<div on:click={removeItem(item)}>
					<RemoveButton />
				</div>
				<img
					on:click={goto('/' + item.category + '/' + item.slug)}
					class="rounded-xl"
					src={item.imgLink}
					alt={item.productName}
				/>
				<div class="p-2">
					<h1>Ürün: {item.productName}</h1>
					<!-- <h2>Renk: {item.color}</h2>
				<h2>Beden: {item.size}</h2> -->
					<p>Fiyat: {Number(item.price).toFixed(2)} ₺</p>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="italic">Henüz favorilere ürün eklemediniz.</div>
{/if}
