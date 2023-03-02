<div class="text-center">
	<h1 class="text-xl mb-5">Kullanıcı Bilgilerim</h1>

	<div class="grid grid-cols-2">
		<div class="flex flex-col gap-5 min-w-full">
			<!-- <div class="m-1">İlanda herkesin göreceği isminiz</div> -->
			<input
				type="text"
				placeholder="Kullanıcı adı"
				class="input input-bordered input-primary w-full max-w-xs mx-auto"
			/>
			<input
				type="text"
				placeholder="Mağaza adı"
				class="input input-bordered input-primary w-full max-w-xs mx-auto"
			/>
			<input
				type="email"
				placeholder="Email"
				class="input input-bordered input-primary w-full max-w-xs mx-auto"
			/>
			<input
				type="number"
				placeholder="Cep telefonu"
				class="input input-bordered input-primary w-full max-w-xs mx-auto"
			/>
			<input
				type="date"
				placeholder="Doğum tarihi"
				class="input input-bordered input-primary w-full max-w-xs mx-auto"
			/>
			<select class="select select-primary w-full max-w-xs mx-auto">
				<option disabled selected>Cinsiyet</option>
				<option>Kadın</option>
				<option>Erkek</option>
			</select>
		</div>

		<div>
			<textarea class="textarea textarea-primary" rows="13" cols="35" placeholder="Adres" />
		</div>
	</div>

	<button class="btn btn-primary">Kaydet</button>
</div>
