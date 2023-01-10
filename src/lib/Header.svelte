<script>
	import { goto } from '$app/navigation';
	import Logo from './Logo.svelte';
	import { shoppingCart, user, isLoggedIn, favProductList } from '../stores';
	import { isAdmin, isSeller } from '../stores/user';
	import { search } from '../stores/search';
	import { homePageProductList, approvedProducts } from '../stores/products';
	import { auth } from '../firebase?client';
	import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth?client';

	let toplamFiyat;
	let searchTerm = '';

	$: searchTerm = $search;

	// Anlık arama
	$: homePageProductList.set(
		$approvedProducts.filter((p) => {
			return (
				p.productName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
				p.tags?.includes(searchTerm.trim().toLowerCase())
			);
		})
	);

	// Butonla arama yapmak için
	const aramaYap = () => {
		goto('/');
		homePageProductList.set(
			$approvedProducts.filter((p) => {
				return (
					p.productName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
					p.tags?.includes(searchTerm.trim().toLowerCase())
				);
			})
		);
	};

	$: {
		toplamFiyat = 0;
		for (let i = 0; i < $shoppingCart?.length; i++) {
			const item = $shoppingCart[i];
			toplamFiyat = toplamFiyat + Number(item.price);
		}
	}

	const login = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			$user = res.user;
			$isLoggedIn = true;
			window.location.reload();
			// goto('/profile');
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			$user = {};
			$isLoggedIn = false;
			await goto('/');
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="navbar bg-base-100 flex-col md:flex-row">
	<div class="navbar-start">
		<div class="flex-1">
			<div class="flex justify-center items-center p-10">
				<Logo />
			</div>
			<!-- <a href="/" class="flex justify-center items-center p-10">
				<img class="h-17" src="/CDlogo.png" alt="Logo" />
			</a> -->
			<!-- <a href="/" class="btn btn-ghost normal-case text-xl">Çift Dikiş</a> -->
		</div>
	</div>
	<div class="navbar-center">
		<form on:submit|preventDefault class="form-control m-2">
			<div class="input-group">
				<input
					bind:value={$search}
					type="text"
					placeholder="Ürün ara…"
					class="input input-bordered w-72"
				/>
				<button on:click={aramaYap} class="btn btn-square btn-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</button>
			</div>
			<div class="mx-1 italic font-light text-sm">kadın, erkek, çocuk, bebek</div>
		</form>
	</div>
	<div class="navbar-end gap-2 justify-center items-center flex flex-col lg:flex-row">
		{#if !$isAdmin || !$isSeller}
			<a href="/satici">
				<div class="btn btn-primary">Satıcı ol</div>
			</a>
		{/if}
		<!-- <a href="/favorilerim">
			<i class="fa fa-heart-o text-xl" aria-hidden="true"></i>
		</a> -->
		<!-- <div class="form-control">
			<input type="text" placeholder="Ürün ara" class="input input-bordered" />
		</div> -->
		<div class="flex justify-center items-center gap-2">
			<a href="/favorilerim">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<i class="fa fa-heart text-xl text-primary" aria-hidden="true" />
						<span class="badge badge-sm indicator-item">{$favProductList.length || 0}</span>
					</div>
				</label>
				<!-- <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
					<div class="card-body">
						<span class="font-bold text-lg">{$shoppingCart?.length} ürün</span>
						<span class="text-info">Toplam: {toplamFiyat.toFixed(2)} ₺</span>
						<div class="card-actions">
							<a href="/sepetim" class="btn btn-primary btn-block">Sepete git</a>
						</div>
					</div>
				</div> -->
			</a>

			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<i class="fa fa-shopping-basket text-xl text-primary" aria-hidden="true" />
						<span class="badge badge-sm indicator-item">{$shoppingCart?.length}</span>
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
					<div class="card-body">
						<span class="font-bold text-lg">{$shoppingCart?.length} ürün</span>
						<span class="text-info">Toplam: {toplamFiyat.toFixed(2)} ₺</span>
						<div class="card-actions">
							<a href="/sepetim" class="btn btn-primary btn-block">Sepete git</a>
						</div>
					</div>
				</div>
			</div>

			{#if $isLoggedIn}
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<!-- svelte-ignore a11y-missing-attribute -->
							<img src={$user.photoURL} />
						</div>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<!-- svelte-ignore a11y-missing-attribute -->
							<a
								><span class="font-bold text-primary"
									>Merhaba, {$user?.displayName?.split(' ')[0]}!</span
								></a
							>
						</li>
						{#if $isAdmin}
							<li>
								<a href="/admin" class="justify-between">
									Yönetim
									<span class="badge badge-error">Admin</span>
								</a>
							</li>
						{/if}
						{#if $isSeller || $isAdmin}
							<li>
								<a href="/ilanver" class="justify-between">
									İlan ver
									<span class="badge badge-primary">Satıcı</span>
								</a>
							</li>
							<li>
								<a href="/ilanlarim" class="justify-between">
									İlanlarım
									<span class="badge badge-primary">Satıcı</span>
								</a>
							</li>
						{/if}
						<li><a href="/bilgilerim">Kullanıcı bilgilerim</a></li>
						<li><a href="/siparislerim">Siparişlerim</a></li>
						<li><a href="/favorilerim">Favorilerim</a></li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li on:click={logout}><a>Çıkış</a></li>
					</ul>
				</div>
			{:else}
				<button on:click={() => goto('/giris')} class="btn btn-outline btn-warning"
					>Giriş yap</button
				>
			{/if}
		</div>
	</div>
</div>
