<script>
	// Api call will be here
	const positive = 50;
	const negative = 0;

	const rate = Math.round((positive / (positive + negative)) * 5);
</script>

<div class="flex justify-center items-center gap-1 p-1 text-primary">
	{#if rate >= 1}
		<i class="fa fa-star cursor-pointer" aria-hidden="true" />
	{:else}
		<i class="fa fa-star-o cursor-pointer" aria-hidden="true" />
	{/if}
	{#if rate >= 2}
		<i class="fa fa-star cursor-pointer" aria-hidden="true" />
	{:else}
		<i class="fa fa-star-o cursor-pointer" aria-hidden="true" />
	{/if}
	{#if rate >= 3}
		<i class="fa fa-star cursor-pointer" aria-hidden="true" />
	{:else}
		<i class="fa fa-star-o cursor-pointer" aria-hidden="true" />
	{/if}
	{#if rate >= 4}
		<i class="fa fa-star cursor-pointer" aria-hidden="true" />
	{:else}
		<i class="fa fa-star-o cursor-pointer" aria-hidden="true" />
	{/if}
	{#if rate >= 5}
		<i class="fa fa-star cursor-pointer" aria-hidden="true" />
	{:else}
		<i class="fa fa-star-o cursor-pointer" aria-hidden="true" />
	{/if}
</div>
