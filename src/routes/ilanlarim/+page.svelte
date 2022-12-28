<script>
	import moment from 'moment';
	import 'moment/dist/locale/tr?client';
	import { removeProduct } from '../../api/itemsApi';
	import RemoveButton from '../../components/RemoveButton.svelte';
	import { user } from './../../stores.js';
	import { allProducts } from './../../stores/products.js';

	// moment.locale('tr');

	const ilanıSil = async (id) => {
		await removeProduct(id);
		window.location.reload();
	};
</script>

<div class="text-center">
	<div class="text-center text-xl">İlanlarım</div>

	<div class="grid grid-cols-2 gap-4 w-1/2 m-auto">
		{#each $allProducts.filter((p) => {
			return p.seller.email === $user.email;
		}) as product}
			<!-- <div class="flex flex-row justify-center items-center gap-2"> -->
			<!-- <div> -->
			<img class="h-36 m-auto" src={product.imgLink} alt="" />
			<!-- </div> -->
			<div class="m-auto relative">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						ilanıSil(product.id);
					}}
				>
					<RemoveButton />
				</div>
				<div>{product.category}</div>
				<div>{product.productName}</div>
				<div>{product.price}₺</div>
				<div>{moment(product.createdAt).format('LLL')}</div>
				{#if !product.approved}
					<div class="italic">(Ürün henüz onay aşamasında.)</div>
				{:else}
					<div class="italic">
						(Ürün {moment(product.approvedAt).format('LLL')} tarihinde yayınlandı.)
					</div>
				{/if}
			</div>
			<!-- </div> -->
		{:else}
			<div class="col-span-2 m-auto">
				Henüz ilan vermediniz. Hemen ilan vermek için <a
					class="text-primary font-bold"
					href="/ilanver">tıkla.</a
				>
			</div>
		{/each}
	</div>
</div>
