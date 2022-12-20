<script>
	import kategoriler from '../../config/kategoriler';
	import { homePageProductList, approvedProducts } from '../../stores/products';

	const homePageUpdate = (category) => {
		const newList = $approvedProducts.filter((p) => {
			return p.category === category;
		});
		homePageProductList.set(newList);
	};

	const showAllProducts = () => {
		homePageProductList.set($approvedProducts);
	};
</script>

<div class="sticky left-1 top-1">
	<!-- Mobile view -->

	<!-- Desktop view -->
	<ul class="menu menu-vertical p-0 m-3">
		<li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<a on:click={showAllProducts} class="m-1 rounded-lg btn-outline btn-primary font-semibold"
				>Tüm ürünler</a
			>
		</li>
		{#each Object.keys(kategoriler) as key (key)}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					on:click={() => {
						homePageUpdate(key);
					}}
					class="rounded-lg btn-primary m-1">{kategoriler[key]}</a
				>
			</li>
		{/each}
	</ul>
</div>
