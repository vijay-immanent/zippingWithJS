import { remoteDev as fileUrls } from "./files.json";
import { parseName, Authorization } from "./utils";
import { saveAs, generateAs } from "./zip";
import JSZip from "jszip";

async function fetchFile(body: string) {
  return fetch("http://localhost:4040/files/object", {
    method: "POST",
    headers: { Authorization, "Content-Type": "application/json" },
    body,
  });
}

export function fetchFileData(urls: string[]) {
  return urls.map(async (S3Href: string) => {
    const reqBody = JSON.stringify({ S3Href });
    const res = await fetchFile(reqBody);

    const reader = res.body!.getReader();
    const rs = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          
          // When there's no more data to be consumed, break the reading
          if (done) {
            break;
          }
          console.log(value)
          
          // Enqueue the next data chunk into our target steam
          controller.enqueue(value);
        }

        // Close the stream
        controller.close();
        reader.releaseLock();
      },
    });

    const finalRes = new Response(rs);
    const blobData = await finalRes.blob();
    saveAs(blobData, parseName(S3Href));
    return blobData;
  });
}

export async function zipRemoteFiles() {
  const f = await Promise.all(fetchFileData(fileUrls));
  return;
  const zip = await addToZip(f);
  const zipContent = await generateAs(zip, "blob");
  const zipName = `remoteGeneratedAsBlobWithFilesAsBinary-${Math.floor(
    Math.random() * 100
  )}.zip`;
  saveAs(zipContent, zipName);
}

async function addToZip(files: Blob[]) {
  let zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    if (f !== null) {
      zip = fileAsBinary(zip, parseName(fileUrls[i]), f);
    }
  }
  return zip;
}

export function fileAsBinary(
  zip: JSZip,
  fileName: string,
  fileContent: Blob
) {
  console.log("adding", fileName, fileContent)
  return zip.file(fileName, fileContent, { binary: true });
}
