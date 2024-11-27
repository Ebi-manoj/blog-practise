const article = document.querySelector('.article-hover');

const handleOver = function (e) {
  const link = e.target.closest('.li-content');

  if (!link) return;
  console.log(link);

  const siblings = link.closest('.articles_ul').querySelectorAll('.li-content');
  console.log(siblings);

  return { link, siblings };
};
if (article) {
  article.addEventListener('mouseover', function (e) {
    const { link, siblings } = handleOver(e);
    siblings.forEach(element => {
      if (element === link) element.classList.remove('active-li');
      else element.classList.add('active-li');
    });
  });
  article.addEventListener('mouseout', function (e) {
    const { siblings } = handleOver(e);
    siblings.forEach(element => {
      element.classList.remove('active-li');
    });
  });
}

// modal window
const modalWindow = document.querySelector('.model-window');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-btn');
const btnOpen = document.querySelectorAll('.edit-btn');
const inputTitile = document.getElementById('title');
const inputContent = document.getElementById('content');
const editForm = document.getElementById('edit-form');

const openModal = async function () {
  const id = this.dataset.id;
  console.log(id);

  try {
    const response = await fetch(`/post/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const postData = await response.json();
    console.log(postData);
    editForm.setAttribute('action', `/edit-post/${id}`);
    inputTitile.value = postData.title;
    inputContent.value = postData.body;
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
  } catch (error) {
    console.log('error fetching data');
  }
};
const closeModal = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpen.forEach(btn => btn.addEventListener('click', openModal));
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden'))
    closeModal();
});

///////////////////////////////////
// delte functionality
const deleteBtn = document.querySelectorAll('.delete-btn');

deleteBtn.forEach(btn =>
  btn.addEventListener('click', async function (e) {
    e.preventDefault();
    const id = this.dataset.id;
    console.log(id);

    const confirmed = confirm('Are you sure want to delete this post');

    if (!confirmed) return;

    try {
      const response = await fetch(`/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Internal Server Issue');
      }
      this.closest('li').remove();
    } catch (error) {
      console.log(`Error delete data`);
    }
  })
);
