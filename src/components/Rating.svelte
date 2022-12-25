<script>
	let hover = 0;
	let clicked = 0;

	// Api call will be here
	let Stars5 = 1;
	let Stars4 = 0;
	let Stars3 = 0;
	let Stars2 = 0;
	let Stars1 = 0;

	// Ağırlıklı aritmetik ortalama
	const average =
		(Stars5 * 5 + Stars4 * 4 + Stars3 * 3 + Stars2 * 2 + Stars1 * 1) /
		(Stars5 + Stars4 + Stars3 + Stars2 + Stars1);

	const rate = average.toFixed(0);

	const onClick = (whichStar) => {
		clicked = whichStar;
		// Db ye kaydet ve db den güncel verileri çek.
		alert('Satıcıya ' + whichStar + ' puan verildi. Satıcı puanı güncellendi.');
	};
</script>

<div class="flex justify-center items-center p-1 text-primary">
	{#if rate >= 1 || hover >= 1}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 1)}
			on:mouseleave={() => (hover = 0)}
			on:click={() => onClick(1)}
			class="fa fa-star cursor-pointer"
			aria-hidden="true"
		/>
	{:else}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 1)}
			on:mouseleave={() => (hover = 0)}
			class="fa fa-star-o cursor-pointer"
			aria-hidden="true"
		/>
	{/if}
	{#if (rate >= 2 || hover >= 2) && hover !== 1}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 2)}
			on:mouseleave={() => (hover = 0)}
			on:click={() => onClick(2)}
			class="fa fa-star cursor-pointer"
			aria-hidden="true"
		/>
	{:else}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 2)}
			on:mouseleave={() => (hover = 0)}
			class="fa fa-star-o cursor-pointer"
			aria-hidden="true"
		/>
	{/if}
	{#if (rate >= 3 || hover >= 3) && hover !== 2 && hover !== 1}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 3)}
			on:mouseleave={() => (hover = 0)}
			on:click={() => onClick(3)}
			class="fa fa-star cursor-pointer"
			aria-hidden="true"
		/>
	{:else}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 3)}
			on:mouseleave={() => (hover = 0)}
			class="fa fa-star-o cursor-pointer"
			aria-hidden="true"
		/>
	{/if}
	{#if (rate >= 4 || hover >= 4) && hover !== 3 && hover !== 2 && hover !== 1}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 4)}
			on:mouseleave={() => (hover = 0)}
			on:click={() => onClick(4)}
			class="fa fa-star cursor-pointer"
			aria-hidden="true"
		/>
	{:else}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 4)}
			on:mouseleave={() => (hover = 0)}
			class="fa fa-star-o cursor-pointer"
			aria-hidden="true"
		/>
	{/if}
	{#if (rate >= 5 || hover >= 5) && hover !== 4 && hover !== 3 && hover !== 2 && hover !== 1}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 5)}
			on:mouseleave={() => (hover = 0)}
			on:click={() => onClick(5)}
			class="fa fa-star cursor-pointer"
			aria-hidden="true"
		/>
	{:else}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<i
			on:mouseover={() => (hover = 5)}
			on:mouseleave={() => (hover = 0)}
			class="fa fa-star-o cursor-pointer"
			aria-hidden="true"
		/>
	{/if}

	<span class="text-sm italic ml-2">
		<p>(%{((average / 5) * 100).toFixed(0)})</p>
	</span>
</div>
