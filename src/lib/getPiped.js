import { toast } from '@zerodevx/svelte-toast';

async function getPiped(videoID) {
	const response = await fetch(`https://pipedapi.kavin.rocks/streams/${videoID}`);

	if (!response.ok) {
		const errorMessage = `Error: Unable to fetch video data. Status: ${response.status} ${response.statusText}`;
		toast.push(errorMessage);
		throw new Error(errorMessage);
	}

	const data = await response.json();

	const hlsUrl = data.hls;
	const thumbnailUrl = data.thumbnailUrl;
	const title = data.title;
	const uploader = data.uploader;

	return { hlsUrl, thumbnailUrl, title, uploader };
}

export default getPiped;
