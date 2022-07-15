export function $<T extends Element>(selector: string) {
  return document.querySelector<T>(selector)!;
}

export function fileLi(f: File) {
  return `<li>${f.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>${(
    f.size / 1000
  ).toFixed(
    2
  )} KB</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>${f.type.toUpperCase()}</strong></li>`;
}
