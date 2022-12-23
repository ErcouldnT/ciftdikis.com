<script>
	import { goto } from '$app/navigation';
	import kategoriler from '../../config/kategoriler';
	import { homePageProductList, approvedProducts } from '../../stores/products';
	import { category } from '../../stores/category';

	const homePageUpdate = (category) => {
		const newList = $approvedProducts.filter((p) => {
			return p.category === category;
		});
		homePageProductList.set(newList);
	};

	const showAllProducts = () => {
		homePageProductList.set($approvedProducts);
		goto('/');
	};

	const goToCategory = (key) => {
		category.set(key);
		goto('/' + key);
	};
</script>

<div class="sticky left-1 top-1">
	<!-- Mobile view -->

	<!-- Desktop view -->
	<ul class="menu menu-vertical p-0 m-3">
		<li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={showAllProducts} class="m-1 rounded-lg btn-outline btn-primary font-semibold">
				Tüm ürünler
			</div>
		</li>
		{#each Object.keys(kategoriler) as key (key)}
			<li data-sveltekit-preload-code="hover">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						goToCategory(key);
					}}
					class="rounded-lg btn-primary m-1"
				>
					{kategoriler[key]}
				</div>
			</li>
		{/each}
	</ul>
</div>
