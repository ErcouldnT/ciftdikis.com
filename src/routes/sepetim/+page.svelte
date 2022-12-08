<script>
	import { goto } from '$app/navigation';
	import { shoppingCart } from '../../stores';

	let cartStep = true;
	let addressStep = false;
	let checkStep = false;
	let paymentStep = false;

	let total;

	$: {
		total = 0;
		for (let i = 0; i < $shoppingCart.length; i++) {
			const item = $shoppingCart[i];
			total = total + Number(item.price);
		}
	}

	const goToAddress = () => {
		cartStep = false;
		addressStep = true;
		// for now
	};

	const goToCheck = () => {
		addressStep = false;
		checkStep = true;
		// for now
	};

	const goToPayment = () => {
		checkStep = false;
		paymentStep = true;
		// for now
	};

	const finishPayment = () => {
		alert('Sipariş oluşturuldu.');
		$shoppingCart = []; // Sepetteki ürünleri siler.
		goto('/siparislerim');
	};

	const previousStep = () => {
		// will be here
	};

	const removeItem = (item) => {
		const result = $shoppingCart.filter((product) => product.slug !== item.slug);
		shoppingCart.set(result);
	};

	// console.log($shoppingCart);
</script>

<svelte:head>
	<title>Çift Dikiş | Sepetim</title>
</svelte:head>

{#if $shoppingCart.length}
	<div class="flex justify-center items-center">
		<ul class="steps steps-vertical lg:steps-horizontal">
			<li class="step {(cartStep || addressStep || checkStep || paymentStep) && 'step-primary'}">
				Sepetle
			</li>
			<li class="step {(addressStep || checkStep || paymentStep) && 'step-primary'}">Adres</li>
			<li class="step {(checkStep || paymentStep) && 'step-primary'}">Kontrol</li>
			<li class="step {paymentStep && 'step-primary'}">Öde</li>
		</ul>
	</div>
	<div class="flex flex-col justify-center items-center m-5 gap-2 pt-5">
		{#if total}
			Sepet toplam <span class="font-bold">{total} ₺</span>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- <div on:click={nextStep} class="btn btn-warning">Sonraki adıma İlerle: Adres girin</div> -->
	</div>
{:else}
	<p class="text-center text-lg">Sepetinizde ürün bulunmamaktadır.</p>
{/if}

{#if cartStep && $shoppingCart.length}
	<div class="flex justify-center items-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={goToAddress} class="btn btn-warning">Sonraki adıma İlerle: Adres girin</div>
	</div>
	<div class="flex flex-wrap justify-center items-center p-5">
		{#each $shoppingCart as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="w-36 m-10 cursor-pointer relative">
				<img
					on:click={removeItem(item)}
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

{#if addressStep && $shoppingCart.length}
	<div class="flex justify-center items-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={goToCheck} class="btn btn-warning">Sonraki adıma İlerle: Kontrol edin</div>
	</div>
	<div class="flex justify-center items-center m-10">
		<textarea class="textarea textarea-primary w-1/5 h-48" placeholder="Adresinizi buraya yazın" />
	</div>
{/if}

{#if checkStep && $shoppingCart.length}
	<div class="flex flex-col justify-center items-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={goToPayment} class="btn btn-warning">Sonraki adıma İlerle: Ödeme ekranı</div>
		<div>Sipariş bilgileri ve adres bilgileri burada yer alır</div>
	</div>
{/if}

{#if paymentStep && $shoppingCart.length}
	<div class="flex flex-col justify-center items-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={finishPayment} class="btn btn-error">Siparişi tamamla</div>
		<div>Kredi kartı bilgileri</div>
	</div>
{/if}
