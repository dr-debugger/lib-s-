const inputFile = document.getElementById("file");
const progressBar = document.getElementById("progressBar");
const submit = document.getElementById("submit");

let file;
inputFile.addEventListener("change", (e) => {
  e.preventDefault();
  file = e.target.files[0];
});

submit.addEventListener("click", () => {
  const fromData = new FormData();

  fromData.append("file", file, file.name);

  let req = new XMLHttpRequest();

  req.upload.addEventListener("progress", (e) => {
    let size = file.size;
    console.log(e);
    if (e.loaded <= size) {
      let percent = Math.round((e.loaded / e.total) * 100);
      progressBar.style.width = `${percent}%`;
    }

    if (e.loaded == e.total) {
      progressBar.style.width = `100%`;
    }
  });

  req.open("POST", "http://localhost:5000/upload");
  req.timeout = 45000;
  req.send(fromData);
});
