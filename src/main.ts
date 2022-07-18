import type { OutputType } from "jszip";
import "./style.css";
import { fileAsBinary, generateAs, saveAs, addToZip } from "./zip";
import { fileLi, $ } from "./utils";
import { zipRemoteFiles } from "./remoteZip";

const input = $<HTMLInputElement>("#inputFiles");
const filesList = $<HTMLOListElement>("#filesList");
const submitBtn = $<HTMLButtonElement>("#generateZip");

input.onchange = (e) => {
  let listItems: string[] = [];
  // @ts-ignore
  for (const f of e.currentTarget.files) {
    listItems.push(fileLi(f));
  }
  filesList.innerHTML = listItems.join("");
};

submitBtn.onclick = async () => {
  if (input.files !== null) {
    const zip = await addToZip(fileAsBinary)(input.files);
    debugger;
    const out: OutputType = "blob";
    const zipContent = await generateAs(zip, out);
    console.log(zipContent);
    debugger;
    const zipName = `generatedAsBlobWithFilesAsBinary-${Math.floor(
      Math.random() * 100
    )}.zip`;
    saveAs(zipContent, zipName);
  }
};

const rZipBtn = $<HTMLButtonElement>("#remoteGenerateZip");
rZipBtn.onclick = zipRemoteFiles;
