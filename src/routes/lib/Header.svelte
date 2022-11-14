<script>
	// import { goto } from '$app/navigation';
	import { shoppingCart } from '../../stores';
</script>

<div class="flex justify-center items-center m-5 px-5">
	<div class="flex-col navbar bg-base-100 m-auto gap-2 md:flex-row">
		<div class="flex-1">
			<a href="/">
				<img class="h-36" src="CDlogo.png" alt="Logo" />
			</a>
			<!-- <a href="/" class="btn btn-ghost normal-case text-xl">Çift Dikiş</a> -->
		</div>
		<div class="form-control">
			<input type="text" placeholder="Ürün ara" class="input input-bordered" />
		</div>
		<div class="flex-none gap-2">
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/></svg
						>
						<span class="badge badge-sm indicator-item">0</span>
					</div>
				</label>
				<div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
					<div class="card-body">
						<span class="font-bold text-lg">0 ürün</span>
						<span class="text-info">Toplam: 0 ₺</span>
						<div class="card-actions">
							<a href="/sepetim" class="btn btn-primary btn-block">Sepete git</a>
						</div>
					</div>
				</div>
			</div>
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img src="https://placeimg.com/80/80/people" />
					</div>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a class="justify-between">
							Profil
							<span class="badge">Yeni</span>
						</a>
					</li>
					<li><a>Ayarlar</a></li>
					<li><a>Çıkış</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
