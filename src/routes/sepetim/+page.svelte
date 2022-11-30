<script>
	import { goto } from '$app/navigation';
	import { shoppingCart } from '../../stores';

	let cartStep = true;
	let addressStep = false;
	let checkStep = false;
	let paymentStep = false;

	let total = 0;

	for (let i = 0; i < $shoppingCart.length; i++) {
		const item = $shoppingCart[i];
		total = total + Number(item.price);
	}

	const nextStep = () => {
		cartStep = false;
		addressStep = true;
		// for now
	};

	const previousStep = () => {
		// will be here
	};

	const removeItem = () => {
		console.log('Ürün silindi.');
	};

	// console.log($shoppingCart);
</script>

<svelte:head>
	<title>Çift Dikiş | Sepetim</title>
</svelte:head>

{#if $shoppingCart.length}
	<div class="flex justify-center items-center">
		<ul class="steps steps-vertical lg:steps-horizontal">
			<li class="step {(cartStep || addressStep) && 'step-primary'}">Sepetle</li>
			<li class="step {addressStep && 'step-primary'}">Adres</li>
			<li class="step {checkStep && 'step-primary'}">Kontrol</li>
			<li class="step {paymentStep && 'step-primary'}">Öde</li>
		</ul>
	</div>
{:else}
	<p class="text-center text-lg">Sepetinizde ürün bulunmamaktadır.</p>
{/if}

<div class="flex flex-col justify-center items-center m-5 gap-2 pt-5">
	{#if total}
		Sepet toplam <span class="font-bold">{total} ₺</span>
	{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={nextStep} class="btn btn-warning">Sonraki adıma İlerle: Adres girin</div>
</div>

{#if cartStep}
	<div class="flex flex-wrap justify-center items-center p-5">
		{#each $shoppingCart as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="w-36 m-10 cursor-pointer relative">
				<img
					on:click={removeItem}
					class="w-9 absolute right-2 top-2 bg-white rounded-full"
					src="trash.png"
					alt="Ürünü sepetten kaldır"
				/>
				<img
					on:click={goto(item.slug)}
					class="rounded-xl"
					src={item.imgLink}
					alt={item.productName}
				/>
				<h1>{item.productName}</h1>
				<h2>{item.desc}</h2>
				<p>{item.price} ₺</p>
			</div>
		{/each}
	</div>
{/if}

{#if addressStep}
	<div class="flex justify-center items-center m-10">
		<textarea class="textarea textarea-primary w-1/5 h-48" placeholder="Adresinizi buraya yazın" />
	</div>
{/if}
