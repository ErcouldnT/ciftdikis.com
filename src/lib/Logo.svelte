<script>
	import { goto } from '$app/navigation';
	// import { fade, blur, fly, slide, scale } from "svelte/transition";
	// import { quintOut } from "svelte/easing";
	import project from '../config/project';
	import { homePageProductList, approvedProducts } from '../stores/products';

	const homePageRefresh = () => {
		homePageProductList.set($approvedProducts);
		goto('/');
	};
</script>

<div>
	<!-- lg:-ml-40 -->
	<a on:click={homePageRefresh} href="/" class="flex flex-col gap-2 text-primary lg:-ml-40">
		<div class="caption text-center text-6xl">{project.name}</div>
		<div class="slogan text-center text-xl">{project.slogan}</div>
	</a>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lobster&display=swap');
	.caption {
		font-family: 'Lobster', cursive;
	}
	.slogan {
		font-family: 'Dancing Script', cursive;
	}
</style>
