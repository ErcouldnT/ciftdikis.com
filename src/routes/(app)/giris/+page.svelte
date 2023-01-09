<script>
	import { goto } from '$app/navigation';
	import { shoppingCart, user, isLoggedIn, favProductList } from '../../../stores';
	import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth?client';
	import { auth } from '../../../firebase?client';

	const login = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			$user = res.user;
			$isLoggedIn = true;
			await goto('/');
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<section class="">
	<div class="px-6 h-full text-gray-800">
		<div
			class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
		>
			<div
				class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					class="w-full"
					alt="Sample image"
				/>
			</div>
			<div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
				<form>
					<div class="flex flex-row items-center justify-center lg:justify-start">
						<p class="text-lg mb-0 mr-1">Google ile hemen giriş yap</p>

						<button
							on:click={login}
							type="button"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							class="inline-block btn btn-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out mx-1"
						>
							<!-- Google -->
							<i class="fa fa-google text-xl" aria-hidden="true" />
						</button>

						<!-- <button
							type="button"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							class="inline-block btn btn-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md  hover:shadow-lg ocus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out mx-1"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-4 h-4">
								<path
									fill="currentColor"
									d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
								/>
							</svg>
						</button> -->
					</div>

					<div
						class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
					>
						<p class="text-center font-semibold mx-4 mb-0 py-4">veya</p>
					</div>

					<!-- Email input -->
					<div class="mb-6">
						<input
							type="email"
							required
							class="form-control block w-full px-4 py-2 text-l font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
							id=""
							placeholder="Email"
						/>
					</div>

					<!-- Password input -->
					<div class="mb-6">
						<input
							type="password"
							required
							class="form-control block w-full px-4 py-2 text-l font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
							id=""
							placeholder="Şifre"
						/>
					</div>

					<!-- <div class="flex justify-between items-center mb-6">
						<div class="form-group form-check">
							<input
								type="checkbox"
								class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								id="exampleCheck2"
							/>
							<label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
								>Beni hatırla</label
							>
						</div>
						<a href="#!" class="text-gray-800">Parolamı unuttum</a>
					</div> -->

					<div class="text-center lg:text-left">
						<button
							type="button"
							class="inline-block px-7 py-3 btn btn-primary font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
						>
							Giriş yap
						</button>
						<p class="text-sm font-semibold mt-2 pt-1 mb-0">
							Hesabınız yoksa hemen şimdi
							<a
								href="/kayit"
								class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
								>kayıt olun.</a
							>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
