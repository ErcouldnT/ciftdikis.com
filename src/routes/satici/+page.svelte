<script>
	import { goto } from '$app/navigation';
	import { satıcıİsteğiGönder } from '../../api/sellersApi';
	import { user } from '../../stores';

	let storeName;
	let address;
	let vergiNo;
	let city;
	let phoneNumber;
	let email;

	$: email = $user?.email;

	const formuGonder = async () => {
		await satıcıİsteğiGönder(storeName, address, vergiNo, city, email, phoneNumber);
		alert('Teşekkürler, form başarıyla gönderildi.');
		goto('/');
	};
</script>

{#if $user}
	<!-- <div class="text-center text-xl text-primary">Nasıl Satıcı Olunur?</div> -->

	<div class="absolute hidden lg:flex w-screen justify-center items-center -z-10">
		<img class="" src="/contact.png" alt="" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center m-10">
		<div class="max-w-md rounded-2xl m-auto text-center p-10 text-xl font-light bg-primary">
			<div class="p-5">
				<p>Merhaba <span class="font-semibold">{$user?.displayName}</span>,</p>
				<p>Öncelikle bizi tercih ettiğiniz için</p>
				<p>teşekkür ederiz.</p>
				<br />
				<p>Şimdi son bir aşama kaldı...</p>
				<br />
				<p class="text-4xl m-2">♥️</p>
				<br />
				<p>Satıcı olabilmeniz için</p>
				<p>formu <span class="underline">eksiksiz</span> doldurmanız</p>
				<p>gerekmektedir.</p>
			</div>
		</div>
		<form on:submit|preventDefault={formuGonder} class="m-auto min-w-full">
			<div class="p-7 rounded-2xl flex flex-col gap-2 justify-center items-center">
				<div class="form-control w-full max-w-xs">
					<!-- svelte-ignore a11y-label-has-associated-control -->

					<label class="label">
						<span class="label-text">Mağaza adınız</span>
						<span class="label-text-alt italic font-light">(zorunlu)</span>
					</label>
					<input
						bind:value={storeName}
						type="text"
						required
						placeholder=""
						class="input input-warning input-bordered w-full max-w-xs"
					/>
				</div>
				<div class="form-control w-full max-w-xs">
					<!-- svelte-ignore a11y-label-has-associated-control -->

					<label class="label">
						<span class="label-text">Mağaza adresiniz</span>
						<span class="label-text-alt italic font-light">(zorunlu)</span>
					</label>
					<!-- <input
          type="text"
          placeholder=""
          class="input input-warning input-bordered w-full max-w-xs"
        /> -->
					<textarea
						bind:value={address}
						class="textarea textarea-warning"
						placeholder=""
						required
					/>
				</div>
				<div class="form-control w-full max-w-xs">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Telefon numarası</span>
						<span class="label-text-alt italic font-light">(zorunlu)</span>
					</label>
					<input
						bind:value={phoneNumber}
						type="number"
						required
						placeholder="537..."
						class="input input-warning input-bordered w-full max-w-xs"
					/>
				</div>
				<div class="form-control w-full max-w-xs">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Vergi numarası</span>
						<span class="label-text-alt italic font-light">(zorunlu)</span>
					</label>
					<input
						bind:value={vergiNo}
						type="number"
						required
						placeholder=""
						class="input input-warning input-bordered w-full max-w-xs"
					/>
				</div>
				<div class="form-control w-full max-w-xs">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Şehir</span>
						<span class="label-text-alt italic font-light">(zorunlu)</span>
					</label>
					<input
						bind:value={city}
						type="text"
						required
						placeholder=""
						class="input input-warning input-bordered w-full max-w-xs"
					/>
				</div>
				<button on:submit={formuGonder} class="btn btn-primary mt-3 w-full max-w-xs"
					>Formu Gönder</button
				>
			</div>
		</form>
	</div>
{:else}
	<div class="text-center">Lütfen öncelikle sisteme giriş yapınız.</div>
{/if}
