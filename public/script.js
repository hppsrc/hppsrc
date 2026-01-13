let glows = document.querySelectorAll(".glow");

glows.forEach((value) => {
	let color = value.classList[1];
	value.addEventListener("mouseover", () => {
		value.style.boxShadow = `#${color}77 0 0 1em`;
		value.style.backgroundColor = `#${color}77`;
		value.style.borderColor = `#${color}`;
		document.body.style.backgroundImage = `linear-gradient(to bottom, #${color}22, #000000)`;
	});
	value.addEventListener("mouseout", () => {
		value.style.boxShadow = `#${color}00 0 0 1em`;
		value.style.backgroundColor = `#${color}00`;
		value.style.borderColor = `#${color}00`;
		document.body.style.backgroundColor = "#000000";
	});
});

let statics = document.querySelectorAll(".static");

statics.forEach((value) => {
	let color = value.classList[1];
	value.style.boxShadow = `#${color}77 0 0 1em`;
	value.style.backgroundColor = `#${color}77`;
	value.style.borderColor = `#${color}`;
});
