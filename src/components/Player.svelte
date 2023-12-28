<script>
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import { loadingVideo } from '$lib/stores.js';

	export let hlsUrl;

	let videoElement;
	let hls;

	async function loadVideo(hlsUrl) {
		loadingVideo.set(true);

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(hlsUrl);
			hls.attachMedia(videoElement);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				loadingVideo.set(false);
				videoElement.play();
			});
		} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
			videoElement.src = hlsUrl;
			videoElement.addEventListener('loadedmetadata', () => {
				loadingVideo.set(false);
				videoElement.play();
			});
		}
	}

	onMount(() => {
		loadVideo(hlsUrl);
	});

	$: {
		if (hlsUrl) {
			loadVideo(hlsUrl);
		}
	}

	function handleInteraction() {
		videoElement.play();
	}

	onDestroy(() => {
		if (hls) {
			hls.destroy();
		}
	});
</script>

<!-- Detect User Interactions -->
<svelte:window on:scroll={handleInteraction} on:click={handleInteraction} />

<section>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoElement} loop class="w-screen max-h-screen">
		<p>
			It's {new Date().getFullYear()} and you're still using a browser that doesn't support the video
			tag, smh.
		</p>
	</video>
</section>
