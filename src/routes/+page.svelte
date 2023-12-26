<script>
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import youtubeId from '$lib/youtubeId';
	import getPiped from '$lib/getPiped';
	import { videoHistory } from '$lib/stores';

	const videos = [
		'https://www.youtube.com/watch?v=Hldi8HhkVqc',
		'https://www.youtube.com/watch?v=unqAOW0uqYQ',
		'https://www.youtube.com/watch?v=8xzkEi9cAOk',
		'https://www.youtube.com/watch?v=WIzsaXqorcM',
		'https://www.youtube.com/watch?v=GeCL5XfNHfE',
		'https://www.youtube.com/watch?v=pd6dCUiqo2w',
		'https://www.youtube.com/watch?v=HZxjYzX3R7Y',
		'https://www.youtube.com/watch?v=caiV8rLZw18',
		'https://www.youtube.com/watch?v=kPlU9O3C5kg',
		'https://www.youtube.com/watch?v=RflNmXjj29I',
		'https://www.youtube.com/watch?v=j3hf5dSBRnk',
		'https://www.youtube.com/watch?v=jrgO_9ey53M',
		'https://www.youtube.com/watch?v=Y5bean7G1a8',
		'https://www.youtube.com/watch?v=wFqkHVLa2Vo',
		'https://www.youtube.com/watch?v=vW9_5giCK1I',
		'https://www.youtube.com/watch?v=fe28jusRess'
	];

	let videoTitle;
	let videoElement;
	let hls;

	let history;
	videoHistory.subscribe((value) => {
		history = value;
	});

	function handleInteraction() {
		videoElement.play();
	}

	function handleKeyPress(event) {
		if (event.key === 'm' || event.key === 'M') {
			let randomIndex;
			do {
				randomIndex = Math.floor(Math.random() * videos.length);
			} while (history.includes(videos[randomIndex]));

			const videoUrl = videos[randomIndex];
			history.push(videoUrl);
			if (history.length > 3) {
				history.shift(); // remove the oldest video from the history
			}
			loadVideo(videoUrl);
		}
	}

	async function loadVideo(videoUrl) {
		const data = await getPiped(youtubeId(videoUrl));

		videoTitle = data.title;
		console.log(`Uploader: ${data.uploader}\nVideo: ${data.title}\nUrl: ${videoUrl}`);

		if (Hls.isSupported()) {
			hls = new Hls();
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
	}

	onDestroy(() => {
		if (hls) {
			hls.destroy();
		}
	});

	onMount(async () => {
		const initialVideoUrl = videos[0];
		history.push(initialVideoUrl);
		await loadVideo(initialVideoUrl);
	});
</script>

<!-- Detect User Interactions -->
<svelte:window
	on:scroll={handleInteraction}
	on:click={handleInteraction}
	on:keydown={handleKeyPress}
/>

<svelte:head>
	<title>{videoTitle} | miku.meme</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoElement} autoplay loop class="w-screen max-h-screen">
		Your browser does not support the video tag.
	</video>
</div>
