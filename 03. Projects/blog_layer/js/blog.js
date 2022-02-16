document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("show-more").addEventListener("click", showMorePosts);
});

const showMorePosts = () => {
  document.getElementById("best-post-wrapper").classList.remove("less");
};
