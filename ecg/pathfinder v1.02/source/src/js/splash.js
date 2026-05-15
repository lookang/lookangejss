export default async function Splash() {
  const content = document.getElementById("home");

  const fadeOut = new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(content.classList.add("fadeOut"));
    }, 5000)
  );

  await fadeOut;

  setTimeout(() => navigateTo("#intro"), 3000);
}
