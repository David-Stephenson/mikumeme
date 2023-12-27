<script>
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import youtubeId from '$lib/youtubeId';
	import getPiped from '$lib/getPiped';
	import { videoHistory, loadingVideo } from '$lib/stores';

	const videos = [
		'https://www.youtube.com/watch?v=Hldi8HhkVqc',
		'https://www.youtube.com/watch?v=unqAOW0uqYQ',
		'https://www.youtube.com/watch?v=8xzkEi9cAOk',
		'https://www.youtube.com/watch?v=WIzsaXqorcM',
		'https://www.youtube.com/watch?v=GeCL5XfNHfE',
		'https://www.youtube.com/watch?v=pd6dCUiqo2w',
		'https://www.youtube.com/watch?v=HZxjYzX3R7Y',
		'https://www.youtube.com/watch?v=caiV8rLZw18',
		'https://www.youtube.com/watch?v=AnmdoUgFbTE',
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
		'https://www.youtube.com/watch?v=lwgjnKf8tuQ',
		'https://www.youtube.com/watch?v=LocruwYJrGw',
		'https://www.youtube.com/watch?v=Jkz1iqCA8u4',
		'https://www.youtube.com/watch?v=Jkz1iqCA8u4',
		'https://www.youtube.com/watch?v=3cRwgDwnT38',
		'https://www.youtube.com/watch?v=XD0tiUPFqcA',
		'https://www.youtube.com/watch?v=qF69HaEaBsM',
		'https://www.youtube.com/watch?v=oZHHTKfbQUY',
		'https://www.youtube.com/watch?v=QFPXdI3lVMI',
		'https://www.youtube.com/watch?v=olIIbJmleEY',
		'https://www.youtube.com/watch?v=xHjsz_3FsTU',
		'https://www.youtube.com/watch?v=lPvbewhBD5g',
		'https://www.youtube.com/watch?v=iM_0OqABaVE',
		'https://www.youtube.com/watch?v=PbylJ6s9wYg',
		'https://www.youtube.com/watch?v=6CT5o-Up4UI',
		'https://www.youtube.com/watch?v=aF75HlzopQ0',
		'https://www.youtube.com/watch?v=SHt3a-KXce0',
		'https://www.youtube.com/watch?v=H38s2SVZN8k',
		'https://www.youtube.com/watch?v=NZaly1mf2Tg',
		'https://www.youtube.com/watch?v=mpbzbf4QKwA',
		'https://www.youtube.com/watch?v=aZgyNVGj7ms',
		'https://www.youtube.com/watch?v=MkwH-MPqOpk',
		'https://www.youtube.com/watch?v=EE1O4f4DH4M',
		'https://www.youtube.com/watch?v=yPuI4l0jK7s',
		'https://www.youtube.com/watch?v=Kr9xoRtD4b8',
		'https://www.youtube.com/watch?v=ehX1m5xOCBU',
		'https://www.youtube.com/watch?v=ueqHQjKvUmM',
		'https://www.youtube.com/watch?v=gnA-zYXHn5I',
		'https://www.youtube.com/watch?v=9svdNGVav7k',
		'https://www.youtube.com/watch?v=ctUmcUUJfe4',
		'https://www.youtube.com/watch?v=cbGvGaA_cbY'
	];

	let data;
	let videoElement;
	let hls;

	videoHistory.subscribe((value) => {
		if (value.length > 3) {
			videoHistory.update((history) => history.slice(1));
		}
	});

	function handleInteraction() {
		console.log('User interaction detected');
		videoElement.play();
	}

	function handleKeyPress(event) {
		if (event.key === 'm' || event.key === 'M') {
			randomVideo();
		}
	}

	function randomVideo() {
		let randomIndex;
		videoHistory.update((history) => {
			do {
				randomIndex = Math.floor(Math.random() * videos.length);
			} while (history.includes(videos[randomIndex]));

			const videoUrl = videos[randomIndex];
			const newHistory = [...history, videoUrl];

			if (newHistory.length > 3) {
				newHistory.shift();
			}

			return newHistory;
		});
		loadVideo(videos[randomIndex]);
	}

	async function loadVideo(videoUrl) {
		loadingVideo.set(true);

		data = await getPiped(youtubeId(videoUrl));

		console.log(`Uploader: ${data.uploader}\nVideo: ${data.title}\nUrl: ${videoUrl}`);

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(data.hlsUrl);
			hls.attachMedia(videoElement);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {
				loadingVideo.set(false);
				videoElement.play();
			});
		} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
			videoElement.src = data.hlsUrl;
			videoElement.addEventListener('loadedmetadata', function () {
				loadingVideo.set(false);
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
		randomVideo();
	});
</script>

<!-- Detect User Interactions -->
<svelte:window
	on:scroll={handleInteraction}
	on:click={handleInteraction}
	on:keydown={handleKeyPress}
/>

<div class="flex items-center justify-center h-screen">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoElement} autoplay loop class="w-screen max-h-screen">
		<p>
			It's {new Date().getFullYear()} and you're still using a browser that doesn't support the video
			tag, smh.
		</p>
	</video>
</div>

{#if data}
	<!-- Credits section -->
	<div class="h-[4vh] text-white">
		<p>{data.title}</p>
		<p>{data.uploader}</p>
	</div>
{/if}
