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
	let kurus = '00';
	let selectedCategory;
	let resimler;
	let resimLinkleri = [];
	let amount;
	let colors = [];
	let sizes = [];

	function getKeyByValue(object, value) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	const uiColors = [
		{ name: 'Kırmızı', checked: false },
		{ name: 'Beyaz', checked: false },
		{ name: 'Siyah', checked: false },
		{ name: 'Yeşil', checked: false },
		{ name: 'Mavi', checked: false },
		{ name: 'Lacivert', checked: false },
		{ name: 'Gri', checked: false },
		{ name: 'Sarı', checked: false },
		{ name: 'Turuncu', checked: false }
	];

	const uiSizes = [
		{ name: 'XXS', checked: false },
		{ name: 'XS', checked: false },
		{ name: 'S', checked: false },
		{ name: 'M', checked: false },
		{ name: 'L', checked: false },
		{ name: 'XL', checked: false },
		{ name: 'XXL', checked: false }
	];

	const choosenColors = () => {
		colors = [];
		uiColors.forEach((color) => {
			if (color.checked) {
				colors.push(color.name);
			}
		});
	};

	const choosenSizes = () => {
		sizes = [];
		uiSizes.forEach((size) => {
			if (size.checked) {
				sizes.push(size.name);
			}
		});
	};

	let loading = false;

	const taglarıAyır = () => {
		const tagler = tagsString.toLowerCase().trim().replace(/\s/g, '').split(',');
		return tagler;
	};

	const ImageToUrl = async (images) => {
		for (let i = 0; i < images.length; i++) {
			const resim = images[i];
			const imageRef = await ref(storage, 'images/' + resim?.name + '-' + nanoid());
			const snapshot = await uploadBytes(imageRef, resim);
			const link = await getDownloadURL(snapshot.ref);
			resimLinkleri.push(link);
			console.log(link);
		}
	};

	const databaseKaydet = async () => {
		try {
			if (!selectedCategory || selectedCategory.toLowerCase().includes('seç'))
				return alert('Lütfen kategori seçiniz.');

			if (!isim) return;
			if (!açıklama) return;
			if (!fiyat) return;
			if (!kurus) return (kurus = '00');

			let ondalıklıFiyat = Number(fiyat + '.' + kurus);

			const tags = taglarıAyır();
			choosenColors();
			choosenSizes();

			if (!colors.length) return alert('Lütfen en az bir renk seçiniz.');
			if (!sizes.length) return alert('Lütfen en az bir beden seçiniz.');

			loading = true;
			const slug = isim.trim().replaceAll(' ', '-').toLowerCase();

			resimler = Object.values(resimler);
			// console.log(resimler);
			// debugger;

			if (!resimler.length) return alert('Lütfen resim yükleyiniz.');
			// resim = resimler[0];

			// const resimLinkleri = [];

			await ImageToUrl(resimler);

			// console.log(resimLinkleri);
			// debugger;

			await itemCreator(
				approved,
				slug,
				getKeyByValue(kategoriler, selectedCategory),
				isim,
				açıklama,
				{
					displayName: $user.displayName,
					email: $user.email,
					photoURL: $user.photoURL
				},
				ondalıklıFiyat,
				resimLinkleri,
				tags,
				colors,
				sizes,
				amount
			);
			alert('Ürün kaydetme başarılı.');
			// loading = false;
			goto('/');

			// const resimAdı = resim[0]?.name;
			// console.log(resim);
		} catch (error) {
			console.log('BAŞARISIZ: ' + error?.message);
		}
	};
</script>

<svelte:head>
	<title>Çift Dikiş | Admin Paneli</title>
</svelte:head>

<!-- <div class="text-center text-xl">Bu sayfadan dilediğiniz gibi ilan gönderebilirsiniz.</div> -->

<form
	on:submit|preventDefault={databaseKaydet}
	class="flex justify-center items-center flex-col gap-5"
>
	<div class="dropdown dropdown-right dropdown-hover">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div>
			<select
				bind:value={selectedCategory}
				required
				class="bg-primary select select-primary w-full max-w-xs"
			>
				<option disabled selected>Kategori seçiniz</option> -->
				{#each Object.keys(kategoriler) || [] as kategoriKey}
					<option>{kategoriler[kategoriKey]}</option>
				{/each}
			</select>
		</div>
	</div>
	<div>
		<input
			bind:value={isim}
			type="text"
			required
			placeholder="Ürün ismi"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div>
		<input
			bind:value={tagsString}
			type="text"
			required
			placeholder="kadın, erkek, çocuk"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div>
		<input
			bind:value={açıklama}
			type="text"
			required
			placeholder="Ürün açıklaması"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div class="flex gap-2">
		<div>
			<input
				bind:value={fiyat}
				type="number"
				required
				placeholder="TL"
				class="input input-bordered input-warning w-full max-w-xs"
			/>
		</div>
		<p class="text-center text-4xl text-primary">,</p>
		<div>
			<input
				bind:value={kurus}
				type="number"
				size="2"
				maxlength="2"
				max="99"
				placeholder="Kuruş"
				class="input input-bordered input-warning w-full max-w-xs"
			/>
		</div>
		<p class="text-center text-4xl text-primary">₺</p>
	</div>
	<div>
		<input
			bind:value={amount}
			required
			type="text"
			placeholder="Stok sayısı"
			class="input input-bordered input-warning w-full max-w-xs"
		/>
	</div>
	<div class="flex gap-4">
		{#each uiColors as color}
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">{color.name}</span>
					<input type="checkbox" bind:checked={color.checked} class="checkbox checkbox-warning" />
				</label>
			</div>
		{/each}
	</div>
	<div class="flex gap-4">
		{#each uiSizes as size}
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">{size.name}</span>
					<input type="checkbox" bind:checked={size.checked} class="checkbox checkbox-warning" />
				</label>
			</div>
		{/each}
	</div>
	<div>
		<div class="form-control w-full max-w-xs">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Ürün resmi yükleyin</span>
				<!-- <span class="label-text-alt">Alt label</span> -->
			</label>
			<input
				bind:files={resimler}
				type="file"
				multiple
				required
				accept="image/*"
				class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
			/>
			<!-- svelte-ignore a11y-label-has-associated-control -->
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
</form>
