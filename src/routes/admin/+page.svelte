<script>
	// import moment from 'moment';
	import { onMount } from 'svelte';
	// import { db } from '../../firebase?client';
	import { allProducts } from '../../stores/products';
	import { allItems } from '../../api/itemsApi?client';
	import { allSellers, sellerCreator, removeSeller } from '../../api/sellersApi';
	import { approveProduct, removeProduct } from '../../api/itemsApi';

	let satıcılar = [];
	let satıcıEmail;

	const satıcılarıAl = async () => {
		const sellersData = await allSellers();
		satıcılar = [...sellersData];
	};

	const satıcıYarat = async (email) => {
		await sellerCreator(email);
		window.location.reload();
	};

	satıcılarıAl();

	onMount(async () => {
		const itemsData = await allItems();
		const all = [...itemsData];
		allProducts.set(all);
	});
</script>

<div class="text-center">
	<div class="p-5 text-xl">Yönetim Merkezi</div>

	<div class="flex flex-row justify-center gap-5">
		<div class="w-1/2 border p-5 rounded">
			<div class="p-2 font-bold">Ürün onaylama</div>
			{#each $allProducts.filter((product) => {
				return product.approved === false;
			}) as p}
				<div class="flex flex-row justify-center items-center gap-5 p-2">
					<img class="rounded-xl h-32 mr-2" src={p.imgLink} alt="" />
					<div>
						<div>Ürün adı: {p.productName}</div>
						<div>Satıcı: {p.seller.displayName}</div>
						<!-- <div>İlan tarihi: {moment(Date(p.createdAt)).format('LLL')}</div> -->
						{#if p.tags}
							<div>Etiketler: {p?.tags?.join(', ')}</div>
						{/if}
					</div>
					<div class="flex flex-col gap-2">
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
				</div>
			{/each}
		</div>
		<div class="w-1/2 border p-5 rounded">
			<div class="p-2 font-bold">Satıcı ekle</div>
			<div>
				<input
					bind:value={satıcıEmail}
					class="w-1/2 rounded"
					type="text"
					placeholder="Satıcı emailini girin"
				/>
				<div
					on:click={() => {
						satıcıYarat(satıcıEmail);
					}}
					class="btn btn-warning btn-outline mt-5"
				>
					Kaydet
				</div>
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<div class="p-2 font-bold mt-5">Satıcılar</div>
				<div class="grid grid-cols-2 gap-2 m-auto">
					{#each satıcılar as satıcı}
						<!-- <div class="grid grid-cols-2"> -->
							<div>{satıcı.email}</div>
							<div>
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
	</div>
</div>
