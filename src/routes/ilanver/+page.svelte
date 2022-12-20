<script>
	import { goto } from '$app/navigation';
	import { nanoid } from 'nanoid';
	import { user } from '../../stores';
	import { isAdmin } from '../../stores/user';
	import { itemCreator } from '../../api/itemsApi';
	import { storage } from '../../firebase?client';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage?client';
	import kategoriler from '../../config/kategoriler';

	const approved = $isAdmin;

	let isim;
	let tagsString;
	let açıklama;
	let fiyat;
	let seçilenKategori;
	let resim;

	let loading = false;

	const kategoriSeç = (kategoriKey) => {
		seçilenKategori = kategoriKey;
		// console.log(seçilenKategori);
	};

	const taglarıAyır = () => {
		const tagler = tagsString.toLowerCase().trim().replace(/\s/g, '').split(',');
		return tagler;
	};

	const databaseKaydet = () => {
		try {
			if (!resim) return;
			resim = resim[0];

			if (!isim) return;
			if (!açıklama) return;
			if (!fiyat) return;
			if (!seçilenKategori) return;

			const tags = taglarıAyır();

			loading = true;

			const slug = isim.trim().replaceAll(' ', '-').toLowerCase();
			const imageRef = ref(storage, 'images/' + resim?.name + '-' + nanoid());
			uploadBytes(imageRef, resim).then((snapshot) => {
				getDownloadURL(snapshot.ref).then(async (link) => {
					await itemCreator(
						approved,
						slug,
						seçilenKategori,
						isim,
						açıklama,
						{
							displayName: $user.displayName,
							email: $user.email,
							photoURL: $user.photoURL
						},
						fiyat,
						link,
						tags
					);
					alert('Ürün kaydetme başarılı.');
					// loading = false;
					goto('/');
				});
			});

			// const resimAdı = resim[0]?.name;
			// console.log(resim);
		} catch (error) {
			alert('BAŞARISIZ: ' + error?.message);
		}
	};
</script>

<svelte:head>
	<title>Çift Dikiş | Admin Paneli</title>
</svelte:head>

<div class="text-center text-xl">
  İlan ver
</div>

<div class="flex justify-center items-center flex-col gap-5">
	<div class="dropdown dropdown-right dropdown-hover">
		<label tabindex="0" class="btn btn-secondary m-1"
			>{seçilenKategori ? seçilenKategori : 'Ürün kategorisi seç'}</label
		>
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			{#each Object.keys(kategoriler) as kategoriKey}
				<li>
					<a
						on:click={() => {
							kategoriSeç(kategoriKey);
						}}>{kategoriler[kategoriKey]}</a
					>
				</li>
			{/each}
		</ul>
	</div>
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
			bind:value={tagsString}
			type="text"
			placeholder="kadın, erkek, çocuk"
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
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Ürün resmi yükleyin</span>
				<!-- <span class="label-text-alt">Alt label</span> -->
			</label>
			<input
				bind:files={resim}
				type="file"
				class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
			/>
			<label class="label">
				<!-- <span class="label-text-alt">Alt label</span> -->
				<!-- <span class="label-text-alt">Alt label</span> -->
			</label>
		</div>
	</div>

	{#if loading}
		<progress class="progress w-56" />
	{:else}
		<button on:click={databaseKaydet} class="btn btn-outline btn-secondary">Kaydet</button>
	{/if}
</div>
