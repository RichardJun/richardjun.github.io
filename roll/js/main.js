


onload=function() {

	var list=document.querySelector(".list");
	var title=document.querySelector(".title");
	var min=100+1,
		count=0;
	var fate='<div class="icon"><img src="images/txt02.png" ></div>';

	title.addEventListener("click", function() {

		var roll=Math.floor(Math.random()*(100+1));//[0,100]
        var li=document.createElement("li");

		if (roll<=min) {//roll的点相同，后roll的小
			min=roll;
			var icon=document.querySelector(".icon");
			if (icon) {
				icon.parentNode.removeChild(icon);
			}
			li.innerHTML=roll+fate;
		} else {
			li.innerHTML=roll;
		}

		console.log(min);
		list.insertBefore(li,list.childNodes[0]);
	});


	resize();

	onresize= function() {
		resize();
	}

	function resize() {
		var h=title.offsetHeight;
		list.style.marginTop=h+'px';
	}


}

