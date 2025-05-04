import { Campanha } from "@/store/types/campanhas";

export const handleSort = <K extends keyof Campanha>(
    key: K,
    sortConfig: { key: K; direction: string },
    setSortConfig: (config: { key: K; direction: string }) => void,
    sortedData: Campanha[],
    setSortedData: (data: Campanha[]) => void
  ) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "desc" ? "asc" : "desc";

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
};