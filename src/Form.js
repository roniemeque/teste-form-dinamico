import React, { useState, useEffect } from "react";
import { fetchFieldsApi } from "./fields";

const Input = ({ field, value, updateLeadValue }) => (
  <input
    type={field.type}
    name={field.name}
    placeholder={field.placeholder}
    className="field"
    value={value}
    onChange={e => updateLeadValue(field.name, e.currentTarget.value)}
  />
);

const Select = ({ field, value, options, updateLeadValue }) => (
  <select
    name={field.name}
    placeholder={field.placeholder}
    className="field select"
    value={value}
    onChange={e => updateLeadValue(field.name, e.currentTarget.value)}
  >
    {field.placeholder && (
      <option value="" disabled>
        {field.placeholder}
      </option>
    )}
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Form = () => {
  const [fields, setFields] = useState([]);
  const [lead, setLead] = useState({});

  const getFieldsAndInitializeLead = async () => {
    const fields = await fetchFieldsApi();

    setFields(fields);

    const initialLead = fields.reduce((total, field) => {
      return {
        ...total,
        [field.name]: field.defaultValue
      };
    }, {});

    setLead(initialLead);
  };

  useEffect(() => {
    getFieldsAndInitializeLead();
  }, []);

  const updateLeadValue = (name, value) => {
    setLead({
      ...lead,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(fields);
    console.log(lead);
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.length && Object.keys(lead).length ? (
        <div className="fields">
          {fields.map(field => {
            switch (field.component) {
              case "input":
                return (
                  <Input
                    key={field.name}
                    field={field}
                    value={lead[field.name]}
                    updateLeadValue={updateLeadValue}
                  ></Input>
                );
              case "select":
                return (
                  <Select
                    key={field.name}
                    field={field}
                    value={lead[field.name]}
                    options={field.options}
                    updateLeadValue={updateLeadValue}
                  ></Select>
                );
              default:
                return null;
            }
          })}
          <button>ok</button>
        </div>
      ) : (
        <span>Carregando...</span>
      )}
    </form>
  );
};

export default Form;
