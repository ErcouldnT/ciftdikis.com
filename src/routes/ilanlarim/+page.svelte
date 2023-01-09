<script>
	import { editProduct } from './../../stores/edit.js';
	import { goto } from '$app/navigation';
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
				<div>{product.price} ₺</div>
				<div>{moment(product.createdAt).format('LLL')}</div>
				{#if !product.approved}
					<div class="italic">(Ürün henüz onay aşamasında.)</div>
				{:else}
					<div class="italic">
						(İlan {moment(product.approvedAt).format('LLL')} tarihinde yayınlandı.)
					</div>
					{#if product.updatedAt}
						<div class="italic">
							(İlanı {moment(product.updatedAt).format('LLL')} tarihinde güncellediniz.)
						</div>
					{/if}
				{/if}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						// console.log(product);
						editProduct.set(product);
						goto('ilanver/duzelt/');
					}}
					class="btn btn-primary m-2"
				>
					İlanı düzenle
				</div>
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
