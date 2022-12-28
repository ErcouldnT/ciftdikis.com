<script>
	import RemoveButton from './../../components/RemoveButton.svelte';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import 'moment/dist/locale/tr?client';
	// import { db } from '../../firebase?client';
	import { allProducts } from '../../stores/products';
	import { allItems } from '../../api/itemsApi?client';
	import {
		allSellers,
		sellerCreator,
		removeSeller,
		satıcıİstekleriniGetir,
		satıcıİsteğiniSil
	} from '../../api/sellersApi';
	import { approveProduct, removeProduct } from '../../api/itemsApi';
	import project from '../../config/project';

	let satıcılar = [];
	let satıcıİstekleri = [];
	let satıcıEmail;

	const satıcılarıAl = async () => {
		const sellersData = await allSellers();
		satıcılar = [...sellersData];
	};

	const satıcıİstekleriniAl = async () => {
		const isteklerVerisi = await satıcıİstekleriniGetir();
		satıcıİstekleri = [...isteklerVerisi];
	};

	const isteğiSil = async (id) => {
		await satıcıİsteğiniSil(id);
		window.location.reload();
	};

	const satıcıYarat = async (email) => {
		await sellerCreator(email);
		window.location.reload();
	};

	satıcılarıAl();
	satıcıİstekleriniAl();

	onMount(async () => {
		const itemsData = await allItems();
		const all = [...itemsData];
		allProducts.set(all);
	});
</script>

<svelte:head>
	<title>{project.name} | Yönetim merkezi</title>
</svelte:head>

<div class="text-center">
	<div class="p-5 text-xl">Yönetim Merkezi</div>

	<div class="grid grid-cols-3 gap-4">
		<div class="border p-5 rounded">
			<div class="p-2 font-bold">Ürün onayla</div>
			<div class="grid grid-cols-3 gap-2 m-auto">
				{#each $allProducts.filter((product) => {
					return product.approved === false;
				}) as p}
					<!-- <div class="flex flex-row justify-center items-center gap-5 p-2"> -->
					<img class="rounded-xl h-32 mr-2 m-auto" src={p.imgLink} alt="" />
					<div class="text-left">
						<div>Ürün: {p.productName}</div>
						<div>Satıcı: {p.seller.displayName}</div>
						<div>Tarih: {moment(p.createdAt).format('LL')}</div>
						<div>Saat: {moment(p.createdAt).format('LT')}</div>
						{#if p.tags}
							<div>Etiket: {p?.tags?.join(', ')}</div>
						{/if}
					</div>
					<div class="grid grid-cols-2 gap-2 m-auto">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={async () => {
								await approveProduct(p.id);
								window.location.reload();
							}}
							class="btn btn-warning btn-outline"
						>
							Onay ver
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={async () => {
								await removeProduct(p.id);
								window.location.reload();
							}}
							class="btn btn-error btn-outline"
						>
							Sil
						</div>
					</div>
					<!-- </div> -->
				{/each}
			</div>
		</div>
		<div class="border p-5 rounded">
			<div class="p-2 font-bold">Satıcı ekle</div>
			<form
				on:submit|preventDefault={() => {
					satıcıYarat(satıcıEmail);
				}}
			>
				<input
					bind:value={satıcıEmail}
					required
					class="w-1/2 rounded"
					type="email"
					placeholder="Satıcı emailini girin"
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						satıcıYarat(satıcıEmail);
					}}
					class="btn btn-warning btn-outline mt-5"
				>
					Kaydet
				</div>
			</form>
			<div class="flex flex-col justify-center items-center gap-2">
				<div class="p-2 font-bold mt-5">Satıcılar</div>
				<div class="grid grid-cols-2 gap-2 m-auto">
					{#each satıcılar as satıcı}
						<!-- <div class="grid grid-cols-2"> -->
						<div class="m-auto">{satıcı.email}</div>
						<div>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click={async () => {
									await removeSeller(satıcı.id);
									window.location.reload();
								}}
								class="btn btn-error btn-outline"
							>
								Satıcıyı iptal et
							</div>
						</div>
						<!-- </div> -->
					{/each}
				</div>
			</div>
		</div>
		<div class="border p-5 rounded">
			<div class="p-2 font-bold">Satıcı istekleri</div>
			<div class="flex flex-col gap-5">
				{#each satıcıİstekleri as istek}
					<div class="flex flex-col border rounded p-2 relative">
						<div>Email: {istek.email}</div>
						<div>Mağaza adı: {istek.storeName}</div>
						<div>Adres: {istek.address}</div>
						<div>Vergi no: {istek.vergiNo}</div>
						<div>Şehir: {istek.city}</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div on:click={() => isteğiSil(istek.id)}>
							<RemoveButton />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
