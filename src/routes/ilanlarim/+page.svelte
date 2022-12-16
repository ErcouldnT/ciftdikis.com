<script>
	import moment from 'moment';
	import { user } from './../../stores.js';
	import { allProducts } from './../../stores/products.js';

	const myOffers = $allProducts.filter((p) => {
		return p.seller.email === $user.email;
	});

	// console.log(myOffers);
</script>

<div class="text-center">
	<div class="mb-3 font-bold">İlanlarım</div>

	<div class="grid grid-cols-2 gap-4 w-1/2 m-auto">
		{#each myOffers as product}
			<!-- <div class="flex flex-row justify-center items-center gap-2"> -->
				<!-- <div> -->
					<img class="h-36 m-auto" src={product.imgLink} alt="" />
				<!-- </div> -->
				<div>
					<div>{product.category}</div>
					<div>{product.productName}</div>
					<div>{product.price}₺</div>
					<div>{moment(product.createdAt).locale('tr').format('LLL')}</div>
					{#if !product.approved}
						<div class="italic">(Ürün henüz onay aşamasında.)</div>
					{:else}
						<div class="italic">
							Ürün {moment(product.approvedAt).locale('tr').format('LLL')} tarihinde yayınlandı.
						</div>
					{/if}
				</div>
			<!-- </div> -->
		{:else}
			<div>
				Henüz ilan vermediniz. Hemen ilan vermek için <a
					class="text-primary font-bold"
					href="/ilanver">tıkla.</a
				>
			</div>
		{/each}
	</div>
</div>
