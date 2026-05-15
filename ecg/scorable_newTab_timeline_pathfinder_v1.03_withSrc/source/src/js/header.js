export default async function Header(props) {
  const {
    'title': title,
    'subtitle': subtitle,
    'redirect-option-image': redirectOptionImage
  } = props;

  const headerContainer = document.querySelector("header");

  const fetchPromises = [];

  if (headerContainer) {
    const headerPromise = fetch("./pages/partials/header.html")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch header: HTTP status ${res.status}`);
        }
        return res.text();
      })
      .then((data) => {

        headerContainer.innerHTML = data;

        const titleElement = headerContainer.querySelector('#header-title');
        const subtitleElement = headerContainer.querySelector('#header-subtitle');
        const imageElement = headerContainer.querySelector('#redirect-image');

        if (titleElement && title) {
          titleElement.textContent = title;
          subtitleElement.textContent = subtitle;
          console.log(`Updated header title to: ${title}`);
        } else if (title) {
          console.warn("Could not find an element with ID 'header-title' in the fetched header HTML.");
        }

        if (imageElement && redirectOptionImage) {

          imageElement.src =`./img/dropdown-selector-triangle-${redirectOptionImage}.png`;
          console.log(`Updated redirect image source to: ${redirectOptionImage}`);
        } else if (redirectOptionImage) {
          console.warn("Could not find an element with ID 'redirect-image' in the fetched header HTML.");
        }

        console.log("Header loaded and modified successfully.");
      });

    fetchPromises.push(headerPromise);
  } else {
    console.log(
      "Header element (<header>) not found on this page. Skipping fetch."
    );
  }

  try {
    await Promise.all(fetchPromises);
    console.log("All necessary partials have finished loading.");
  } catch (error) {
    console.error("Error loading or modifying HTML partials:", error.message);
  }

  const dropdownBtn = document.getElementById("dropdown-selector-btn");
  const dropdownMenu = document.getElementById("sectionDropdown");
 
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", (event) => {
      event.stopPropagation();  
      dropdownMenu.classList.toggle("show");
    });
  }

}