<script>
	import { each } from 'svelte/internal';
	import { shoppingCart } from '../../stores';

	// console.log($shoppingCart);
</script>

{#if $shoppingCart.length}
	<div class="flex justify-center items-center">
		<ul class="steps steps-vertical lg:steps-horizontal">
			<li class="step step-primary">Sepetle</li>
			<li class="step">Adres</li>
			<li class="step">Kontrol</li>
			<li class="step">Öde</li>
		</ul>
	</div>
{:else}
	<p class="text-center text-lg">Sepetinizde ürün bulunmamaktadır.</p>
{/if}

<div class="flex flex-wrap justify-center items-center">
	{#each $shoppingCart as item}
		<div class="h-36 w-36 m-10">
			<img class="rounded-xl" src={item.imgLink} alt={item.productName}>
			<h1>{item.productName}</h1>
			<p>{item.price} ₺</p>
		</div>
	{/each}
</div>
