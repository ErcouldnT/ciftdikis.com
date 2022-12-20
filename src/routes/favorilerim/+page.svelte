<script>
	import { favoriteProducts } from '../../stores/products';
</script>

<div class="text-center text-xl">Beğendiğim Ürünler</div>

<div class="text-center">
	{#each $favoriteProducts as product}
		<div>{product.productName}</div>
	{/each}
</div>
