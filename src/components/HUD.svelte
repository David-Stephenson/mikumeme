<script>
	import Loading from '$components/Loading.svelte';
	import { loadingVideo, currentVideo } from '$lib/stores.js';

	let loading = true;
	let video;

	loadingVideo.subscribe((value) => {
		loading = value;
	});

	currentVideo.subscribe((value) => {
		video = value;
	});

	let color = 'cyan';
	setInterval(() => {
		color = color === 'cyan' ? 'pink' : 'cyan';
	}, 5000);
</script>

<section class="flex justify-between items-end">
	<div>
		{#if video.title !== undefined && video.uploader !== undefined}
			<div class="flex space-x-2 text-white">
				<a href={video.videoUrl}>{video.title}</a>
				<p>|</p>
				<a href="https://youtube.com/{video.uploaderUrl}">{video.uploader}</a>
			</div>
		{/if}
	</div>

	<div>
		{#if loading}
			<div class="flex justify-end m-4">
				<Loading />
			</div>
		{/if}

		<h1 class="{color} flex justify-end font-bold text-2xl">Press 'M' for more Miku memes</h1>
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
