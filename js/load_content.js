document.addEventListener('DOMContentLoaded', function(){
  let nav_links = document.querySelectorAll('.navbar-nav a');
  let container = document.querySelector('.main');
  let main_content = container.innerHTML;
  for (let k=0; k < nav_links.length; k++) {
  	nav_links[k].addEventListener('click', function(e) {
  		let href = nav_links[k].attributes.href.value;
  		if (!href || href.startsWith("#"))
  			return;
  		e.preventDefault();
  		var xhr = new XMLHttpRequest();
  		xhr.open('GET', nav_links[k].attributes.href.value, false);
  		xhr.send();
  		if (xhr.status == 200)
			container.innerHTML = xhr.responseText;
		else
			container.innerHTML = main_content;
  	})
  }
});