const API_ROUTES = {
  level: {
    list: `${process.env.NEXT_PUBLIC_API_URL}/niveis?:queryParams`,
    create: `${process.env.NEXT_PUBLIC_API_URL}/niveis`,
    update: `${process.env.NEXT_PUBLIC_API_URL}/niveis/:nivelID`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}/niveis/:nivelID`,
  },
  developer: {
    list: `${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores?:queryParams`,
    create: `${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores`,
    update: `${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores/:devID`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores/:devID`,
  },
};

export { API_ROUTES };
