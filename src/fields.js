const fields = [
  {
    component: "input",
    type: "text",
    name: "nome",
    placeholder: "Nome",
    defaultValue: ""
  },
  {
    component: "input",
    type: "email",
    name: "email",
    placeholder: "Email",
    defaultValue: ""
  },
  {
    component: "input",
    type: "text",
    name: "telefone",
    placeholder: "Telefone",
    defaultValue: ""
  },
  {
    component: "select",
    name: "capital",
    placeholder: "Capital de Investimento",
    defaultValue: "",
    options: ["100k", "200k", "300k"]
  }
];

export const fetchFieldsApi = async () => {
  await new Promise(res => setTimeout(res, 2000));
  return fields;
};
