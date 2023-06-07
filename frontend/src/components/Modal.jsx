import React, { useState, useEffect } from "react";

export const Modal = ({ closeModal, onSubmit, defaultValue, formFields, mode }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const errorFields = [];
    for (const field of formFields) {
      if (!formState[field.name]) {
        errorFields.push(field.name);
      }
    }

    if (errorFields.length === 0) {
      setErrors("");
      return true;
    } else {
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState, mode);

    closeModal();
  };

  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (e.target.className === "fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40") closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-md w-1/2">
        <form>
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col mb-4">
              <label htmlFor={field.name} className="font-semibold">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea name={field.name} onChange={handleChange} value={formState[field.name] || ""} className="border border-black rounded-md p-1 text-base" />
              ) : field.type === "select" ? (
                <select name={field.name} onChange={handleChange} value={formState[field.name] || ""} className="border border-black rounded-md p-1 text-base">
                  {field.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input type={field.type} name={field.name} onChange={handleChange} value={formState[field.name] || ""} className="border border-black rounded-md p-1 text-base" />
              )}
            </div>
          ))}
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
