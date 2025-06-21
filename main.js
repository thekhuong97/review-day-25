// Lấy ra các Element cần làm việc
const openNewsFeeds = document.querySelector("#open-newsfeed");
const newsFeedModal = document.querySelector("#newfeed-modal");
const modals = document.querySelectorAll(".js-modal");
const closeButtons = document.querySelectorAll(".js-modal-close");

// Hàm tính độ rộng của thanh cuộn
function getScrollbarWidth() {
  // Tạo thêm 1 Element (div) mới nhưng chưa thêm vào DOM
  const div = document.createElement("div");
  // Thêm CSS inline cho Element
  div.style.overflowY = "scroll";
  // Tạo thêm 1 Element (div) mới nhưng chưa thêm vào DOM
  const child = document.createElement("div");
  // Thêm Element (child) vào bên trong Element (div)
  div.appendChild(child);
  // Thêm Element (div) vào trong DOM (hiện ra ở giao diện)
  document.body.appendChild(div);
  // Tính độ rộng của thanh cuộn
  const scrollBarWidth = div.offsetWidth - child.offsetWidth;
  // Gỡ bỏ Element (div) khỏi DOM
  document.body.removeChild(div);
  // Hàm trả về độ rộng của thanh cuộn
  return scrollBarWidth;
}

// Hàm đóng modal khi nhấn phím ESC
function handleESC(event) {
  if (event.key === "Escape") {
    const currentModal = document.querySelector(".js-modal.show");
    if (currentModal) {
      currentModal.classList.remove("show");
      // Gỡ lắng nghe sự kiện nhấn phím ESC trên body
      document.body.removeEventListener("keydown", handleESC);
    }
  }
}

function closeModal(modal) {
  modal.classList.remove("show");
  // Khôi phục chức năng cuộn của body khi đóng modal
  document.body.style.overflow = "";
  // Ngăn nội dung của body trên Windows bị giật khi đóng modal
  document.body.style.paddingRight = "";
  // Gỡ lắng nghe sự kiện nhấn phím ESC trên body
  document.body.removeEventListener("keydown", handleESC);
}

openNewsFeeds.onclick = () => {
  newsFeedModal.classList.add("show");
  // Vô hiệu hoá chức năng cuộn của body khi mở modal
  document.body.style.overflow = "hidden";
  // Ngăn nội dung của body trên Windows bị giật khi mở modal
  document.body.style.paddingRight = getScrollbarWidth() + "px";
  // Lắng nghe sự kiện nhấn phím ESC trên body
  document.body.addEventListener("keydown", handleESC);
};

// Lặp để lấy từng phần tử của NodeList
closeButtons.forEach((closeBtn) => {
  closeBtn.onclick = (event) => {
    // Lấy ra Element cha khi target vào Element con (dùng closest)
    const modal = event.target.closest(".js-modal");
    if (modal) {
      closeModal(modal);
    }
  };
});

modals.forEach((modal) => {
  modal.onclick = (event) => {
    const container = event.target.closest(".modal-container");
    if (container) {
      return event.stopPropagation();
    }
    closeModal(modal);
  };
});
