<script>
	import Hls from 'hls.js';
	import youtubeId from '$lib/youtubeId';
	import getPiped from '$lib/getPiped';
	import { onMount } from 'svelte';

	let videoElement; // reference to the video element

	function handleInteraction() {
		videoElement.play();
	}

	onMount(async () => {
		const videos = ['https://www.youtube.com/watch?v=Hldi8HhkVqc'];
		const data = await getPiped(youtubeId(videos[0]));

		console.log(
			`-----------\nUploader: ${data.uploader}\nVideo: ${data.title}\nUrl: ${videos[0]}\n-----------`
		);

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(data.hlsUrl);
			hls.attachMedia(videoElement);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {
				videoElement.play();
			});
		} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
			videoElement.src = data.hlsUrl;
			videoElement.addEventListener('loadedmetadata', function () {
				videoElement.play();
			});
		}
	});
</script>

<!-- Detect User Interactions -->
<svelte:window on:scroll={handleInteraction} on:click={handleInteraction} />

<svelte:head>
	<title>miku.meme</title>
	<script
		defer
		data-domain="miku.meme"
		src="https://plausible.stephenson.systems/js/script.js"
	></script>
</svelte:head>

<div class="flex items-center justify-center h-screen bg-black">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoElement} autoplay loop class="w-screen max-h-screen">
		Your browser does not support the video tag.
	</video>
</div>
