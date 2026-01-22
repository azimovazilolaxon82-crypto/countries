const main = document.querySelector(".main");
const search = document.querySelector(".search");
const btnSort = document.querySelector(".btn");
const regionSelect = document.querySelector(".region");
const sunBtn = document.querySelector("#sun");
const moonBtn = document.querySelector("#moon");

const body = document.body;

let themeChange = localStorage.getItem("theme");

if (themeChange === "dark") {
  body.classList.add("dark");
  sunBtn.style.display = "block";
  moonBtn.style.display = "none";
} else {
  body.classList.remove("dark");
  sunBtn.style.display = "none";
  moonBtn.style.display = "block";
}

let countryData = [];
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,area,languages,currencies,timezones",
)
  .then((response) => response.json())
  .then((data) => {
    countryData = data;
    renderCountry(data);
  });

function renderCountry(data) {
  main.innerHTML = "";
  data.forEach((item) => {
    const fragment = document.createDocumentFragment();
    const box = document.createElement("div");
    box.classList.add("box");
    const image = document.createElement("img");
    image.src = item.flags.png;
    image.alt = item.flags.alt || item.name.common;
    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = ` Country Name: ${item.name.common}`;
    const region = document.createElement("h4");
    region.classList.add("region");
    region.textContent = `Region: ${item.region}`;
    fragment.append(image, title, region);
    box.appendChild(fragment);
    main.appendChild(box);
  });
}
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const searchData = countryData.filter((item) =>
    item.name.common.toLowerCase().includes(value),
  );
  renderCountry(searchData);
});
regionSelect.addEventListener("change", () => {
  const value = regionSelect.value;
  if (value === "All") {
    renderCountry(countryData);
  } else {
    const filteredData = countryData.filter((item) => item.region === value);
    renderCountry(filteredData);
  }
});
btnSort.addEventListener("click", () => {
  const sortedWord = [...countryData].sort((harf1, harf2) => {
    if (harf1.name.common < harf2.name.common) return -1;
    if (harf1.name.common > harf2.name.common) return 1;
    return 0;
  });
  renderCountry(sortedWord);
});
sunBtn.addEventListener("click", () => {
  sunBtn.style.display = "none";
  moonBtn.style.display = "block";
  sunBtn.style.color = "black";
  body.classList.add("dark");
  localStorage.setItem("theme", "dark");
});
moonBtn.addEventListener("click", () => {
  sunBtn.style.display = "block";
  moonBtn.style.display = "none";
  sunBtn.style.color = "white";
  body.classList.remove("dark");
  localStorage.setItem("theme", "light");
});
