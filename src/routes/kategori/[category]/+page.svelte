<script>
	export let data;

	const categoryKey = data.categoryKey;
	const category = data.category;
</script>

<svelte:head>
	<title>Çift Dikiş | {category}</title>
</svelte:head>

<div class="text-center text-2xl">
	Merhaba ben {category} sayfası!
</div>
