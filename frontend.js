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


async function fetchSalary() {
  try {
    const res = await fetch("http://localhost:8080/app/salary");
    const data = await res.json();
    console.log("Average Salary:", data);
    return data;
  } catch (error) {
    console.error("Error fetching salary:", error);
  }
}

async function fetchGenderWork() {
  try {
    const res = await fetch("http://localhost:8080/app/applicants/gender_work");
    const data = await res.json();
    console.log("Gender + Institution:", data);
    return data;
  } catch (error) {
    console.error("Error fetching gender/work data:", error);
  }
}

