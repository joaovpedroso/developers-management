const parseDate = (value: string) => {
  const dateWithTimeZero = `${value} 00:00:00`;

  return new Date(dateWithTimeZero);
};

const formatDateToLocale = (value: string) => {
  const parsedDate = parseDate(value);

  return parsedDate.toLocaleDateString("pt-BR");
};

export { parseDate, formatDateToLocale };
