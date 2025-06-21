const openNewsFeeds = document.querySelector("#open-newsfeed");
const newsFeedModal = document.querySelector("#newfeed-modal");
const closeButtons = document.querySelectorAll(".modal-close");

function getScrollbarWidth() {
  const div = document.createElement("div");
  div.style.overflowY = "scroll";
  const child = document.createElement("div");
  div.appendChild(child);
  document.body.appendChild(div);
  const scrollBarWidth = div.offsetWidth - child.offsetWidth;
  document.body.removeChild(div);
  console.log(scrollBarWidth);
}

getScrollbarWidth();

openNewsFeeds.onclick = () => {
  newsFeedModal.classList.add("show");
  // Vô hiệu hoá chức năng cuộn của body khi mở modal
  document.body.style.overflow = "hidden";
};

closeButtons.forEach((closeBtn) => {
  closeBtn.onclick = (event) => {
    const modal = event.target.closest(".modal");
    if (modal) {
      modal.classList.remove("show");
      //   Khôi phục chức năng cuộn của body khi đóng modal
      document.body.style.overflow = "";
    }
  };
});
