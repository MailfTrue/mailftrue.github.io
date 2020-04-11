const URLS = {
  '/': ['/task1/main.html', 'Главная'],
  '/about': ['/task1/about.html', 'Обо мне'],
  '/verse': ['/task1/verse.html', 'Стих']
}

const USE_HISTORY = !window.location.host.endsWith('.github.io')

function load_page(path, config) {
    if (!config)
      config = {};
    let url = URLS[path][0],
        title = URLS[path][1],
        container = document.querySelector('.main');
        xhr = new XMLHttpRequest();
    xhr.open('GET', URLS[path][0], false);
    xhr.send();
    if (xhr.status == 200) {
      container.innerHTML = xhr.responseText;
      document.title = title;
      if (USE_HISTORY) {
        if (!config.replace_state)
          history.pushState({path}, title, path);
        else
          history.replaceState({path}, title, path);
      }
    } else
      alert('load error');
}

document.addEventListener('DOMContentLoaded', function() {
    let nav_links = document.querySelectorAll('.navbar a');
    for (let k = 0; k < nav_links.length; k++) {
        nav_links[k].addEventListener('click', function(e) {
            let href = nav_links[k].attributes.href.value;
            if (!href || href.startsWith("#"))
                return;
            e.preventDefault();
            load_page(nav_links[k].attributes.href.value);
            e.stopPropagation();
        })
    };

    let current_path = window.location.pathname;
    if (current_path.endsWith('/') && current_path.length > 1)
        current_path = current_path.slice(0, -1);
    load_page(current_path, {replace_state: true});
});

if (USE_HISTORY) {
  window.addEventListener('popstate', function(e){
    load_page(e.state.path, {replace_state: true});
    return true;
  });
}