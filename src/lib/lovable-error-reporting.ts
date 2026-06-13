export function reportLovableError(error: Error, info: { boundary: string }) {
  console.error(`[Lovable Error Reporting - ${info.boundary}]:`, error);
}
