import JSZip from "jszip";
import type { OutputType } from "jszip";

type AddFileToZip = (zip: JSZip, file: File) => void;

export async function withFilesAsText(files: FileList): Promise<JSZip> {
  let zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const f = files.item(i);
    if (f !== null) {
      const fileName = f.name;
      const fileContent = await f.text();
      zip.file(fileName, fileContent);
    }
  }
  return zip;
}

export const fileAsBinary: AddFileToZip = (zip, file) => {
  const fileName = file.name;
  const fileContent = file;
  zip.file(fileName, fileContent, { binary: true });
};

export function addToZip(operation: AddFileToZip) {
  return async (files: FileList) => {
    let zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
      const f = files.item(i);
      if (f !== null) {
        operation(zip, f);
      }
    }
    return zip;
  };
}

export async function generateAs(zip: JSZip, out: OutputType) {
  return await zip.generateAsync({ type: out });
}

export function saveAs(content: Blob, filename: string) {
  const fileURL = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = fileURL;
  a.download = filename;
  a.click();
}
 