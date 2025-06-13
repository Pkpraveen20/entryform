export const parseDDMMYYYY = (stamp: string): number => {
  // "12/06/2025 12:19:12"  →  Date(milliseconds)
  const [d, m, rest] = stamp.split("/");
  const [y, h, min, s] = rest.split(/[:\s]/).map(Number);
  return new Date(+y, +m - 1, +d, h, min, s).getTime();
};
