<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { items } from '../../stores';
</script>

<svelte:head>
	<title>Çift Dikiş | {data.name}</title>
</svelte:head>

<div class="flex justify-center items-center ">
	<div class="card lg:card-side bg-base-100 shadow-xl max-w-4xl">
		<figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
		<div class="card-body">
			<h2 class="card-title">{data.name}</h2>
			<p>Click the button to listen on Spotiwhy app.</p>
			<div class="card-actions justify-end">
				<!-- <button class="btn btn-primary">Sepete ekle</button> -->
				<label for="my-modal-4" class="btn btn-primary">Sepete ekle</label>
			</div>
		</div>
	</div>
</div>
