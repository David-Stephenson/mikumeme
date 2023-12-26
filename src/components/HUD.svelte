<script>
	let color = 'cyan';
	setInterval(() => {
		color = color === 'cyan' ? 'pink' : 'cyan';
	}, 5000);
</script>

<section>
	<div>
		<h1 class={color}>Press 'M' for more Miku memes</h1>
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
