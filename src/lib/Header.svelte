<script>
	import { goto } from '$app/navigation';
	import Logo from './Logo.svelte';
	import { shoppingCart, user, isLoggedIn } from '../stores';
	import { auth } from '../firebase?client';
	import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth?client';
	import kategoriler from '../config/kategoriler';

	let toplamFiyat;

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
			// goto('/');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="navbar bg-base-100 flex-col md:flex-row">
	<div class="navbar-start">
		<div class="flex-1">
			<a href="/" class="flex justify-center items-center p-10">
				<Logo />
			</a>
			<!-- <a href="/" class="flex justify-center items-center p-10">
				<img class="h-17" src="/CDlogo.png" alt="Logo" />
			</a> -->
			<!-- <a href="/" class="btn btn-ghost normal-case text-xl">Çift Dikiş</a> -->
		</div>
	</div>
	<div class="navbar-center">
		<ul class="menu menu-horizontal p-0 m-3">
			<!-- <li tabindex="0">
				<a class="btn btn-outline btn-warning rounded-lg">
					Kategoriler
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
					>
				</a>
				<ul class="p-2 z-10 rounded-lg bg-white w-full border">
					<li><a>T-shirt</a></li>
					<li><a>Sweatshirt</a></li>
					<li><a>Kazak</a></li>
					<li><a>Gömlek</a></li>
					<li><a>Eşofman</a></li>
					<li><a>Kapri</a></li>
					<li><a>Mont</a></li>
					<li><a>Takım Elbise & Smokin</a></li>
				</ul>
			</li> -->
			{#each Object.keys(kategoriler) as key}
				<li>
					<a href={'/kategori/' + key} target="_self" class="rounded-lg btn-outline btn-warning"
						>{kategoriler[key]}</a
					>
				</li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end gap-2 justify-center items-center flex flex-col lg:flex-row">
		<!-- <div class="form-control">
			<input type="text" placeholder="Ürün ara" class="input input-bordered" />
		</div> -->
		<div class="flex justify-center items-center gap-2">
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
						<span class="badge badge-sm indicator-item">{$shoppingCart?.length}</span>
					</div>
				</label>
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
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img src={$user.photoURL} />
						</div>
					</label>
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="/admin" class="justify-between">
								Satıcı paneli
								<span class="badge">Yeni</span>
							</a>
						</li>
						<li><a href="/bilgilerim">Kullanıcı bilgilerim</a></li>
						<li><a href="/siparislerim">Siparişlerim</a></li>
						<li><a href="/favorilerim">Favorilerim</a></li>
						<li><a href="/ilanlarim">İlanlarım</a></li>
						<li on:click={logout}><a>Çıkış</a></li>
					</ul>
				</div>
			{:else}
				<button on:click={login} class="btn btn-outline btn-warning">Giriş yap</button>
			{/if}
		</div>
	</div>
</div>
