<script>
	import kategoriler from '../../config/kategoriler';
</script>

<div>
	<!-- Mobile view -->
	<div class="dropdown lg:hidden p-5">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-primary m-1">Kategoriler</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a href="/" target="_self">Tüm ürünler</a></li>
			{#each Object.keys(kategoriler) as key (key)}
				<li><a href={'/kategori/' + key} target="_self">{kategoriler[key]}</a></li>
			{/each}
		</ul>
	</div>

	<!-- Desktop view -->
	<ul class="menu menu-vertical p-0 m-3 hidden lg:flex">
		<li>
			<a href="/" target="_self" class="rounded-lg btn-outline btn-warning font-semibold">Tüm ürünler</a>
		</li>
		{#each Object.keys(kategoriler) as key (key)}
			<li>
				<a href={'/kategori/' + key} target="_self" class="rounded-lg btn-outline btn-warning"
					>{kategoriler[key]}</a
				>
			</li>
		{/each}
	</ul>
</div>
