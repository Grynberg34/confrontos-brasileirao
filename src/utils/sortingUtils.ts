export const handleSort = (
    key: string,
    sortConfig: { key: string; direction: string },
    setSortConfig: (config: { key: string; direction: string }) => void,
    sortedData: any[],
    setSortedData: (data: any[]) => void
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