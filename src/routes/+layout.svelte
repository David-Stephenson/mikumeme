<script>
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import HUD from '$components/HUD.svelte';

	import '../app.pcss';

	let isLoading = true;

	onMount(() => {
		console.log(
			'%c miku.meme ',
			'font-weight: bold; font-size: 50px;color: rgb(225,40,133); text-shadow: 3px 3px 0 rgb(19,122,127), 6px 6px 0 rgb(134,206,203), 9px 9px 0 rgb(190,200,209), 12px 12px 0 rgb(55,59,62)'
		);
	});
</script>

<svelte:head>
	<title>miku.meme</title>
	<script
		defer
		data-domain="miku.meme"
		src="https://plausible.stephenson.systems/js/script.js"
	></script>
</svelte:head>

<SvelteToast />

<section>
	<div class="absolute w-screen z-50 bottom-0">
		<HUD />
	</div>
	<slot />
</section>
