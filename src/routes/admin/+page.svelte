<script>
	import { itemCreator } from '../../api/itemsApi';
	import { user } from '../../stores';

	let isim;
	let açıklama;
	let fiyat;
	let link;

	const databaseKaydet = async () => {
		const slug = isim.trim().replace(' ', '-').toLowerCase();
		await itemCreator(
			slug,
			isim,
			açıklama,
			{
				displayName: $user.displayName,
				email: $user.email,
				photoURL: $user.photoURL
			},
			fiyat,
			link
		);
	};
</script>

<svelte:head>
	<title>Çift Dikiş | Admin Paneli</title>
</svelte:head>

<div class="flex justify-center items-center flex-col gap-5">
	<div>
		<input
			bind:value={isim}
			type="text"
			placeholder="Ürün ismi"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div>
		<input
			bind:value={açıklama}
			type="text"
			placeholder="Ürün açıklaması"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div>
		<input
			bind:value={fiyat}
			type="text"
			placeholder="Ürün fiyatı"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div>
		<input
			bind:value={link}
			type="text"
			placeholder="Ürün resim link"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<button on:click={databaseKaydet} class="btn btn-outline btn-secondary">Kaydet</button>
</div>
