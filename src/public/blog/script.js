function getTime(timestamp) {
	const date = new Date(timestamp * 1000);

	const hour = String(date.getHours()).padStart(2, "0");
	const min = String(date.getMinutes()).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);

	// relative time
	const difTime = Math.floor((new Date() - date) / 1000);
	let relTime = "";

	if (difTime < 60) {
		relTime = `${difTime} seconds`;
	} else if (difTime < 3600) {
		const mins = Math.floor(difTime / 60);
		relTime = `${mins} ${mins === 1 ? "min" : "mins"}`;
	} else if (difTime < 86400) {
		const hours = Math.floor(difTime / 3600);
		relTime = `${hours} ${hours === 1 ? "hour" : "hours"}`;
	} else if (difTime < 604800) {
		const days = Math.floor(difTime / 86400);
		relTime = `${days} ${days === 1 ? "day" : "days"}`;
	} else if (difTime < 2628000) {
		const weeks = Math.floor(difTime / 604800);
		relTime = `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
	} else if (difTime < 31536000) {
		const months = Math.floor(difTime / 2628000);
		relTime = `${months} ${months === 1 ? "month" : "months"}`;
	} else {
		const years = Math.floor(difTime / 31536000);
		relTime = `${years} ${years === 1 ? "year" : "years"}`;
	}

	return `${hour}:${min} ${day}/${month}/${year} (${relTime} ago)`;
}

function showPost(postID) {
	alert(postID);
}

async function loadData() {
	try {
		const response = await fetch("blog.json");
		const data = await response.json();

		document.getElementById("info").innerText = "Fetching...";

		let index = 0;

		data.forEach((e) => {
			let div = document.createElement("div");

			div.id = e.postID;

			div.innerHTML = `
                <div>
                    <h2>${e.title}</h2>
					${index == 0 ? "<strong>Most recent post!</strong>" : ""}
                    <small class="postID">${e.postID}</small>
                </div>

                <p>${e.content}</p>

                <div>
                    ${
						e.url
							? `<small><a href='${e.url}' target='_blank'>Related link</a></small>`
							: "<small>No related link this time!</small>"
					}
                    <small>${getTime(e.timeStamp)}</small>
                </div>
            `;

			div.classList = index == 0 ? "post new" : "post";

			document.body.appendChild(div);

			index++;
		});

		// focus post
		const hash = window.location.hash;
		if (hash) {
			const postID = hash.substring(1);
			const targetPost = document.getElementById(postID);

			if (targetPost) {
				targetPost.scrollIntoView({ behavior: "smooth" });

				targetPost.classList.add("highlight");
				setTimeout(() => targetPost.classList.remove("highlight"), 20000);
			} else {
				alert("The specified post could not be found.");
			}
		}
	} catch (error) {
		console.error("Error:", error);
		document.body.innerHTML += `<h3><i>Something went wrong...</i></h3> <p>${error}</p>`;
	}

	document.body.removeChild(document.getElementById("info"));
}

loadData();
