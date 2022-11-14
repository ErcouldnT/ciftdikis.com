<script>
  import { goto } from '$app/navigation';
	import { items } from '../stores';

  const goToProduct = (name) => {
    goto(name.trim().replace(" ", "-").toLowerCase());
  };
</script>

<svelte:head>
	<title>Çift Dikiş | Tshirt ve daha fazlası...</title>
</svelte:head>

<div class="flex flex-wrap gap-5 justify-center items-center">
	{#each $items as item}
		<div on:click={goToProduct(item.name)} class="card w-96 bg-base-100 shadow-xl cursor-pointer mb-7">
			<figure><img class="h-72" src={item.img} alt="Ürün" /></figure>
			<div class="card-body">
				<h2 class="card-title">{item.name}</h2>
				<p class="font-bold text-2xl">{item.price}₺</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">İncele</button>
				</div>
			</div>
		</div>
	{/each}
</div>
