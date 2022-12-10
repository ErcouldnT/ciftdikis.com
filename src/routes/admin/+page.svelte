<script>
	// import { onMount } from 'svelte';
	import { db } from '../../firebase?client';
	import { allProducts } from '../../stores/products';
	import moment from 'moment';
	// import { user, isLoggedIn, items } from '../../stores';
	// import { allItems } from '../api/itemsApi?client';

	// onMount(async () => {
	// 	const itemsData = await allItems(); // Add that to store
	// 	const products = [...itemsData];
	// });

	const controlProducts = $allProducts.filter((product) => {
		return product.approved === false;
	});

	const ürüneOnayVer = (product) => {
		// console.log(product);
	};

	const ilanıKaldır = (product) => {
		// console.log(product);
	};
</script>

<div class="text-center">
	<div class="p-5 text-xl">Yönetim Merkezi</div>

	<div class="flex flex-row justify-center gap-5">
		<div class="w-1/2 border p-5 rounded">
			<div class="p-2 font-bold">Ürün onaylama</div>
			{#each controlProducts as p}
				<div class="flex flex-row justify-center items-center gap-5 p-2">
					<img class="rounded-xl h-32 mr-2" src={p.imgLink} alt="" />
					<div>
						<div>Ürün adı: {p.productName}</div>
						<div>Satıcı: {p.seller.displayName}</div>
						<div>İlan tarihi: {moment(Date(p.createdAt)).format('LLL')}</div>
					</div>
					<div class="flex flex-col gap-2">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={() => {
								ürüneOnayVer(p);
							}}
							class="btn btn-warning btn-outline"
						>
							Onay ver
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={() => {
								ilanıKaldır(p);
							}}
							class="btn btn-error btn-outline"
						>
							Sil
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="w-1/2 border p-5 rounded">
			<div class="p-2 font-bold">Satıcı ekle</div>
			<div>
				<input class="w-1/2 rounded" type="text" placeholder="Satıcı emailini girin" />
				<div class="btn btn-warning btn-outline mt-5">Kaydet</div>
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<div class="p-2 font-bold mt-5">Satıcılar</div>
				<div class="flex flex-row justify-center items-center gap-10">
					<div>Örnek kullanıcı #1</div>
					<div class="btn btn-error btn-outline">Satıcıyı iptal et</div>
				</div>
				<div class="flex flex-row justify-center items-center gap-10">
					<div>Örnek kullanıcı #2</div>
					<div class="btn btn-error btn-outline">Satıcıyı iptal et</div>
				</div>
				<div class="flex flex-row justify-center items-center gap-10">
					<div>Örnek kullanıcı #3</div>
					<div class="btn btn-error btn-outline">Satıcıyı iptal et</div>
				</div>
			</div>
		</div>
	</div>
</div>
