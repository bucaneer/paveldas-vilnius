'use strict';

function createImg(photo_obj) {
  let img_url = 'Photo/' + photo_obj.photo;

  let img = document.createElement('img');
  img.setAttribute('decoding', 'async');
  img.setAttribute('loading', 'lazy');
  img.setAttribute('src', img_url);
  img.setAttribute('title', photo_obj.adresas);

  let link = document.createElement('a');
  link.setAttribute('href', img_url);
  link.setAttribute('target', '_blank');
  link.append(img);

  let caption = document.createElement('figcaption');
  caption.innerHTML = photo_obj.adresas;

  let figure = document.createElement('figure');
  figure.setAttribute('class', 'gallery-figure');
  figure.append(link);
  figure.append(caption);

  return figure;
}

function createSeniunija(seniunija_obj) {
  let id = 'gID_' + seniunija_obj.gID;

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', 'gID[]');
  input.setAttribute('value', seniunija_obj.gID);

  let indicator = document.createElement('span');
  indicator.append('(' + seniunija_obj.a_info + ' / ' + seniunija_obj.a_total + ')');
  indicator.setAttribute('class', 'indicator');

  let label = document.createElement('label');
  label.append(input);
  label.append(' ' + seniunija_obj.name + ' ');
  label.append(indicator);

  let li = document.createElement('li');
  li.setAttribute('class', 'filter-input');
  li.setAttribute('id', id);
  li.setAttribute('data-gid', seniunija_obj.gID);
  li.append(label);

  input.addEventListener('change', async(event) => {
    let gatves = document.getElementById('gatves-container');
    let state = input.checked;
    gatves.querySelectorAll('.filter-input[data-gid="'+seniunija_obj.gID+'"]').forEach(async (elem) => {
      elem.hidden = !state;
      let g_input = elem.querySelector('input');
      if (elem.hidden && g_input.checked) {
        g_input.checked = false;
        g_input.dispatchEvent(new Event('change'));
      }
    });
  });

  return li;
}

function createGatve(gatve_obj) {
  let id = 'nID_' + gatve_obj.nID;

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', 'nID[]');
  input.setAttribute('value', gatve_obj.nID);

  let indicator = document.createElement('span');
  indicator.append('(' + gatve_obj.a_info + ' / ' + gatve_obj.a_total + ')');
  indicator.setAttribute('class', 'indicator');

  let label = document.createElement('label');
  label.append(input);
  label.append(' ' + gatve_obj.name + ' ');
  label.append(indicator);

  let li = document.createElement('li');
  li.setAttribute('class', 'filter-input');
  li.setAttribute('id', id);
  li.setAttribute('data-gid', gatve_obj.gID);
  li.setAttribute('data-nid', gatve_obj.nID);
  li.hidden = true;
  li.append(label);

  input.addEventListener('change', async(event) => {
    let adresai = document.getElementById('adresai-container');
    let state = input.checked;
    adresai.querySelectorAll('.filter-input[data-nid="'+gatve_obj.nID+'"]').forEach(async (elem) => {
      elem.hidden = !state;
      if (state) return;
      let a_input = elem.querySelector('input');
      if (a_input.checked) {
        a_input.checked = false;
        a_input.dispatchEvent(new Event('change'));
      }
    });
  });

  return li;
}

function createAdresas(adresas_obj) {
  let id = 'ID_' + adresas_obj.ID;
  let timeout;

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', 'ID[]');
  input.setAttribute('value', adresas_obj.ID);

  let label = document.createElement('label');
  label.append(input);
  label.append(' ' + adresas_obj.adresas);

  let li = document.createElement('li');
  li.setAttribute('class', 'filter-input');
  li.setAttribute('id', id);
  li.setAttribute('data-gid', adresas_obj.gID);
  li.setAttribute('data-nid', adresas_obj.nID);
  li.setAttribute('data-id',  adresas_obj.ID);
  li.hidden = true;
  li.append(label);

  if (!adresas_obj.info) {
    input.setAttribute('disabled', true);
    li.setAttribute('class', li.getAttribute('class') + ' no-info');
  }

  input.addEventListener('change', async(event) => {
    let results = document.getElementById('results-list');
    let r_id = 'result_' + adresas_obj.ID;
    let state = input.checked;
    let result;
    if (!state) {
      result = document.getElementById(r_id);
      if (result) result.remove();
      if (timeout) window.clearTimeout(timeout);
      return;
    }
    let wait_for_object = _ => {
      if (!objektai_data || !objektai_data[''+adresas_obj.ID]) {
        timeout = window.setTimeout(wait_for_object, 100);
        return;
      }
      result = createResult(objektai_data[''+adresas_obj.ID]);
      results.append(result);
    };

    wait_for_object();
  });

  return li;
}

function createResult(result_obj) {
  let id = 'result_' + result_obj.ID;

  let template = document.getElementById('result-template');
  let result = template.cloneNode(true);
  Object.keys(result_obj).forEach(key => {
    result.querySelectorAll('span.r-' + key).forEach(elem => {
      elem.innerHTML = result_obj[key];
    });
  });
  
  let wait_for_photo = _ => {
      if (!photo_data) {
        timeout = window.setTimeout(wait_for_photo, 100);
        return;
      }
      let photo_count = 0;
      result_obj.photos.forEach(photo => {
        if (!photo_data[photo]) return;
        let img = createImg(photo_data[photo]);
        result.querySelector('.photo-container').append(img);
        photo_count++;
      });
      
      let missing = result_obj.photos.length - photo_count;
      if (missing) {
        result.querySelector('.r-photo_count').innerHTML = missing;
      } else {
        result.querySelector('.missing-photo-alert').hidden = true;
      }
  };
  wait_for_photo();

  result.setAttribute('id', id);
  result.hidden = false;

  return result;
}

function getPhotoSection(photo_obj) {
  let section = document.getElementById('nID_' + photo_obj.nID);
  if (section) {
    return section;
  }

  let photo_container = document.getElementById('photo-container');
  let index_container = document.getElementById('index');
  
  let id = 'nID_' + photo_obj.nID;
  let label = photo_obj.adresas.split(/ [0-9]/)[0];

  let heading = document.createElement('h3');
  heading.append(label);

  section = document.createElement('section');
  section.setAttribute('id', id);
  section.append(heading);

  let link = document.createElement('a');
  link.setAttribute('href', '#' + id);
  link.innerHTML = label;

  let li = document.createElement('li');
  li.append(link);

  index_container.append(li);
  photo_container.append(section);

  return section;
}

async function loadPhotos(data) {
  let keys = Object.keys(data);
  for (let i = 0, p = Promise.resolve(); i < keys.length; i++) {
    p = p.then(_ => new Promise(resolve => {
      let photo_obj = data[keys[i]];
      if (!photo_obj) return resolve();
      let section = getPhotoSection(photo_obj);
      section.append(createImg(photo_obj));
      if (i == keys.length-1) loadFinished();
      resolve();
    }));
  }
}

async function loadList(data, selector, creator) {
  let container = document.getElementById(selector);
  for (let i = 0, p = Promise.resolve(); i < data.length; i++) {
    p = p.then(_ => new Promise(resolve => {
      let obj = data[i];
      if (!obj) return resolve();
      
      container.append(creator(obj));
      if (i == data.length-1) {
        document.querySelector('.loader[data-selector="'+selector+'"]').hidden = true;
      }
      resolve();
    }));
  }
}

function loadFinished() {
  document.getElementById('page-loader').remove();
}

let photo_data;
let seniunijos_data;
let gatves_data;
let adresai_data;
let objektai_data;
let hide_stack = {};

async function toggleSelectAll(event, list_selector) {
  let state = event.target.checked;
  
  let gatves  = document.getElementById('gatves-container');
  let adresai = document.getElementById('adresai-container');
  let results = document.getElementById('results-list');
  
  let toggle_loading = state => {
    if (!hide_stack[list_selector]) hide_stack[list_selector] = 0;
    if (state) {
      hide_stack[list_selector]++;
    } else {
      hide_stack[list_selector]--;
      if (hide_stack[list_selector] > 0) return;
    }
    gatves.hidden = state;
    adresai.hidden = state;
    results.hidden = state;
    if (!state) {
      [gatves, adresai].forEach(list => {
        let first_checked = list.querySelector('input:checked');
        if (!first_checked) return;
        first_checked.closest('.filter-input').scrollIntoView(false);
      });
    }
    event.target.closest('label').querySelector('.loader').hidden = !state;
  };
  
  let elems = document.getElementById(list_selector).querySelectorAll('.filter-input:not([hidden]) input');
  if (elems.length) toggle_loading(true);
  
  elems.forEach(async (elem, i) => {
    window.setTimeout(_ => {
      if (i == elems.length-1) {
        toggle_loading(false);
      }
      if (elem.disabled || elem.checked == state) return;
      elem.checked = state;
      elem.dispatchEvent(new Event('change'));
    }, 0);
  });
}

window.addEventListener('load', async (event) => {
  fetch('photos.json')
    .then(response => response.json())
    .then(data => {
      photo_data = data;
      if (document.getElementById('photo-container')) {
        loadPhotos(data);
      }
    });

  if(!document.getElementById('filters-container')) return;

  fetch('seniunijos.json')
    .then(response => response.json())
    .then(data => {
      seniunijos_data = data;
      if (document.getElementById('seniunijos-container')) {
        loadList(data, 'seniunijos-container', createSeniunija);
      }
    });

  fetch('gatves.json')
    .then(response => response.json())
    .then(data => {
      gatves_data = data;
      if (document.getElementById('gatves-container')) {
        loadList(data, 'gatves-container', createGatve);
      }
    });

  fetch('adresai.json')
    .then(response => response.json())
    .then(data => {
      adresai_data = data;
      if (document.getElementById('adresai-container')) {
        loadList(data, 'adresai-container', createAdresas);
      }
    });

  fetch('objektai.json')
    .then(response => response.json())
    .then(data => {
      objektai_data = data;
      document.querySelector('.loader[data-selector="results-list"]').hidden = true;
    });

  document.getElementById('all_seniunijos').addEventListener('change', async (event) => {
    toggleSelectAll(event, 'seniunijos-container');
  });

  document.getElementById('all_gatves').addEventListener('change', async (event) => {
    toggleSelectAll(event, 'gatves-container');
  });

  document.getElementById('all_adresai').addEventListener('change', async (event) => {
    toggleSelectAll(event, 'adresai-container');
  });
});