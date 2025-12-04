// when clicking on button switch

const list = document.querySelector(".carousel");
const item = document.querySelector(".item");
const itemWidth = item.offsetWidth;

function getClick(direction) {
if(direction === "previous"){
    list.scrollBy({ left: -itemWidth, behavior: "smooth"});
} else {
    list.scrollBy({ left: itemWidth, behavior: "smooth"});
}
}