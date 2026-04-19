export function cn(...inputs: (string | boolean | undefined | null | unknown)[]) {
  return inputs.filter(Boolean).join(" ");
}
