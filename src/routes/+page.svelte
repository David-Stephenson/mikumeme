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
		'https://www.youtube.com/watch?v=fe28jusRess',
		'https://www.youtube.com/watch?v=rf5U0-71P8Y',
		'https://www.youtube.com/watch?v=pG35AYXAnTw',
		'https://www.youtube.com/watch?v=qh-EqX6pSzQ',
		'https://www.youtube.com/watch?v=PyX5_mtx86c',
		'https://www.youtube.com/watch?v=cTVM2cQ3JI0',
		'https://www.youtube.com/watch?v=fiCRhszDHlM',
		'https://www.youtube.com/watch?v=rxiSecU4EZg',
		'https://www.youtube.com/watch?v=PEwCB_ci7nE',
		'https://www.youtube.com/watch?v=bPdv_HMNunI',
		'https://www.youtube.com/watch?v=L5sNq0HpHuE',
		'https://www.youtube.com/watch?v=9kWCDbxnWKo',
		'https://www.youtube.com/watch?v=bU5rv7WfK30',
		'https://www.youtube.com/watch?v=0pCznUUkY6k',
		'https://www.youtube.com/watch?v=osP5IkxsQ0g',
		'https://www.youtube.com/watch?v=PWtb991Y6uc',
		'https://www.youtube.com/watch?v=iu88uIvwpgg',
		'https://www.youtube.com/watch?v=whKNCs1nym4',
		'https://www.youtube.com/shorts/496piVh2YMo',
		'https://www.youtube.com/watch?v=egcfC7PCneQ',
		'https://www.youtube.com/shorts/KUD0UH7R1vQ',
		'https://www.youtube.com/watch?v=lwgjnKf8tuQ'
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
		const initialVideoUrl = videos[Math.floor(Math.random() * videos.length)];
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
