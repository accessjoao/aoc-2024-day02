import * as fs from "fs";

function parseInput(raw: string): number[][] {
  return raw
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/).map(Number));
}

function isMonotone(levels: number[]): boolean {
  const diffs = [];
  for (let i = 1; i < levels.length; i++) {
    diffs.push(levels[i] - levels[i - 1]);
  }

  const allInc = diffs.every((d) => d > 0);
  const allDec = diffs.every((d) => d < 0);
  if (!allInc && !allDec) return false;

  return diffs.every((d) => {
    const ad = Math.abs(d);
    return ad >= 1 && ad <= 3;
  });
}

function isSafe(levels: number[]): boolean {
  return isMonotone(levels);
}

function isSafeWithDampener(levels: number[]): boolean {
  if (isSafe(levels)) return true;

  for (let i = 0; i < levels.length; i++) {
    const candidate = [...levels.slice(0, i), ...levels.slice(i + 1)];
    if (isSafe(candidate)) return true;
  }
  return false;
}

function part1(reports: number[][]): number {
  return reports.filter(isSafe).length;
}

function part2(reports: number[][]): number {
  return reports.filter(isSafeWithDampener).length;
}

function main() {
  const raw = fs.readFileSync("input.txt", "utf8");
  const reports = parseInput(raw);

  console.log("Part 1:", part1(reports));
  console.log("Part 2:", part2(reports));
}

main();