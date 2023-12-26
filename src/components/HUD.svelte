<script>
	import Loading from '$components/Loading.svelte';
	import { loadingVideo } from '$lib/stores.js';

	let loading = true;

	loadingVideo.subscribe((value) => {
		loading = value;
	});

	let color = 'cyan';
	setInterval(() => {
		color = color === 'cyan' ? 'pink' : 'cyan';
	}, 5000);
</script>

<section>
	{#if loading}
		<div class="flex justify-end m-4">
			<Loading />
		</div>
	{/if}
	<div>
		<h1 class="{color} font-bold text-2xl">Press 'M' for more Miku memes</h1>
	</div>
</section>

<style>
	.cyan {
		color: rgb(225, 40, 133);
	}
	.pink {
		color: rgb(134, 206, 203);
	}
</style>
