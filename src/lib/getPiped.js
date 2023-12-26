async function getPiped(videoID) {
	const response = await fetch(`https://pipedapi.kavin.rocks/streams/${videoID}`);
	const data = await response.json();

	console.log(data);

	const hlsUrl = data.hls;
	const thumbnailUrl = data.thumbnailUrl;
	const title = data.title;
	const uploader = data.uploader;

	return { hlsUrl, thumbnailUrl, title, uploader };
}

export default getPiped;
