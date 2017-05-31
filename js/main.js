$(document).ready(function() {
		$.ajax({
			url: "https://api.douban.com/v2/movie/top250",
			type: 'GET',
			dataType: 'JSONP',
			success: function (data) {
				let details = data.subjects;
				for (let i=0; i < details.length;i++) {
					createBox(details[i].images.large, details[i].title, details[i].alt);
				}
			}
		})
		window.onscroll = function () {
			if (startNum < 250) {
				if (checkCondition()) {
					changeTip();
				}
			}
			else
				alert("全部加载完毕！")
		}
	})

	var startNum = 20;
	const wait = document.getElementById('wait');

	function createBox(src, title, url) {
		let oParent = document.getElementById('content');

		let box = document.createElement("div");
		box.className = "box";

		let link = document.createElement("a");
		link.href = url;
		link.setAttribute("target", "_blank");

		let img = document.createElement("img");
		img.src = src;

		let titl = document.createElement("span");
		titl.className = "title";
		titl.innerHTML = title;

		link.appendChild(img);
		box.appendChild(link);
		box.appendChild(titl);
		oParent.appendChild(box);
	}

	const loadMovie = function () {
		return new Promise((resolve, reject) => {
			$.ajax({
			url: "https://api.douban.com/v2/movie/top250?start=" + startNum,
			type: 'GET',
			dataType: 'JSONP',
			success: function (data) {
				let details = data.subjects;

				resolve(details);
				}
			})
		});
	}

	const changeTip = async () => {
		wait.style.display = "inline";
		let d = await loadMovie();
		startNum += 23;
		for (let i=0; i < d.length;i++) {
					createBox(d[i].images.large, d[i].title, d[i].alt);
		}
		wait.style.display = "none";

	}

	function checkCondition () {
		if (document.body.scrollTop + document.body.clientHeight === document.body.scrollHeight)
			return true;
		else
			return false;
	}