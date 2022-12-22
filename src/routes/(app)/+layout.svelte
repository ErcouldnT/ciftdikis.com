<script>
	import Categories from '$lib/Home/Categories.svelte';
</script>

<!-- Sağdaki menüyü ekleyince grid-cols-7 yap. -->
<div class="grid lg:grid-cols-6 grid-cols-1">
	<div class="border rounded-2xl col-span-1 pb-3">
		<Categories />
	</div>
	<div class="m-auto col-span-5">
		<slot />
	</div>
	<!-- <div class="border rounded-2xl col-span-1">
		<div>Son eklenen ürünler</div>
		<div>En çok beğenilen ürünler</div>
		<div>En çok görüntülenen ürünler</div>
		<div>Aynı kategorideki benzer ürünler</div>
	</div> -->
</div>
