const clearString = (value: string) =>
  value.normalize("NFD").replace(/[^a-zA-Z_\s]/g, "");

export { clearString };
