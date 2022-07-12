export function generateZip() {}

export function save(content: Blob, filename: string) {
  const fileURL = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = fileURL;
  a.download = filename;
  a.click();
}
