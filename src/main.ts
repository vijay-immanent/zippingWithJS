import "./style.css";

const input = document.querySelector<HTMLInputElement>("#inputFiles")!;
const filesList = document.querySelector<HTMLOListElement>("#filesList")!;
const submitBtn = document.querySelector<HTMLButtonElement>("#generateZip")!;

input.onchange = (e) => {
  let listItems: string[] = [];
  const fileLi = (f: File) =>
    `<li>${f.name}&nbsp;${(f.size / 1000).toFixed(
      2
    )} KB ${f.type.toUpperCase()}</li>`;
  for (const f of e.target.files) {
    listItems.push(fileLi(f));
  }
  filesList.innerHTML = listItems.join("");
};
