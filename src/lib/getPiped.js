import { toast } from '@zerodevx/svelte-toast';

async function getPiped(videoID) {
	const response = await fetch(`https://pipedapi.kavin.rocks/streams/${videoID}`);

	if (!response.ok) {
		const errorMessage = `Error: Unable to fetch video data. Status: ${response.status} ${response.statusText}`;
		toast.push(errorMessage, { initial: 0 });
		throw new Error(errorMessage);
	}

	const data = await response.json();
	const { hls: hlsUrl, thumbnailUrl, title, uploadDate, uploader, uploaderUrl } = data;

	return { hlsUrl, thumbnailUrl, title, uploadDate, uploader, uploaderUrl };
}

export default getPiped;
