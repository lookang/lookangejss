export default async function Footer() {
  const footer = document.querySelector("footer");

  const fetchPromises = [];

  if (footer) {
    const footerPromise = fetch("./pages/partials/footer.html")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch footer: HTTP status ${res.status}`);
        }
        return res.text();
      })
      .then((data) => {
        footer.innerHTML = data;
        console.log("Footer loaded successfully.");
      });

    fetchPromises.push(footerPromise);
  } else {
    console.log(
      "Footer element (<footer>) not found on this page. Skipping fetch."
    );
  }

  try {

    await Promise.all(fetchPromises);
    console.log("All necessary partials have finished loading.");
  } catch (error) {
    console.error("Error loading one or more HTML partials:", error.message);

  }

}
