const article = document.querySelector('.article');

const handleOver = function (e) {
  const link = e.target.closest('.li-content');

  if (!link) return;
  console.log(link);

  const siblings = link.closest('.articles_ul').querySelectorAll('.li-content');
  console.log(siblings);

  return { link, siblings };
};
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
