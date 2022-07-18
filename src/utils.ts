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

export function parseName(url: string) {
    // @ts-ignore
    return decodeURI(url.split(".com/").pop());
}


export const Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIEp1bCAxNSAyMDIyIDE5OjQxOjE2IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInJvbGUiOiJzdXBlcnVzZXIiLCJ1c2VyIjp7InBhc3N3b3JkIjoiJDJhJDEwJGI3VGFHSm15TkFlbkQxb2RGQTZxWk80bDFPV1YuTWFjUnRJNTIuc3JJTjZSZkQzMDR5YXVHIiwibGFzdF9uYW1lIjoiTmFkZWVtIiwiZmlyc3RfbmFtZSI6IlNhaGlyIiwiZGF0ZUFkZGVkIjoiMjAyMi0wNi0wM1QwNTo0NjoxMC4xNzRaIiwic3RhdHVzIjoiQWN0aXZlIiwiaWQiOiI4OGI3NzA1OS0yMmFkLTRkYzUtODEzNi04NDYxMzg4YzE5MmQiLCJlbWFpbCI6InNhaGlyLm5hZGVlbUBtaW5kZXZvbHZlZC5jb20ifSwiaWF0IjoxNjU3ODk0Mjc2fQ.miD28U0y0Ej9imhrAuRLiIdlDRH75hxL_9BABS7zf8Y";