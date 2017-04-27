function hasGetUserMedia() {
  // Note: Opera builds are unprefixed.
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  console.log("Good to go!");
} else {
  alert('getUserMedia() is not supported in your browser');
}

// getUserMedia参数，navigator.getUserMedia({audio:true, video:true '},funcSuccess,funFail)
// 用localhost，getUserMedia才能在chrome里使用
// Not showing vendor prefixes.
navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } }, 
	function(stream) {
		var video = document.querySelector('video');
		video.src = window.URL.createObjectURL(stream);
		video.onloadedmetadata = function(e) {
			video.play();
		};
	},
	function(err) {
		console.log("The following error occurred: " + err.name);
	}
);


