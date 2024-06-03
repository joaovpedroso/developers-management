const API_URL = {
  level: {
    list: "http://localhost:8000/api/niveis?:queryParams",
    create: "http://localhost:8000/api/niveis",
    update: "http://localhost:8000/api/niveis/:nivelID",
    delete: "http://localhost:8000/api/niveis/:nivelID",
  },
  developer: {
    list: "http://localhost:8000/api/desenvolvedores?:queryParams",
    create: "http://localhost:8000/api/desenvolvedores",
    update: "http://localhost:8000/api/desenvolvedores/:devID",
    delete: "http://localhost:8000/api/desenvolvedores/:devID",
  },
};

export { API_URL };
