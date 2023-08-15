import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  //    variable de carga
  const [loading, setLoading] = useState(false);

  //variable sde respuesta
  const [response, setResponse] = useState(null);

  // funcion handle cambio de valores
  const handleChange = (e) => {
   const{name, value}=e.target
    setForm({ ...form, [name]: value });
  };

  // funcion handleBlur cuando se lancen las validaciones, cuando pierde el foco el elemento del formulario, alli es cuando se desencadenan las variables
  const handleBlur = (e) => {
   handleChange(e);
   setErrors(validateForm(form))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if(Object.keys(errors).length === 0){
      alert('Enviando Formulario');
      setLoading(true);
      helpHttp().post("https://formsubmit.co/ajax/erlandruiz.erlandrivera@gmail.com",{
        body:form,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json"
        }
      })
      .then((res)=>{
        setLoading(false);
        setResponse(true);
        setForm(initialForm)
        setTimeout(() => {
          setResponse(false)
        }, 3000);
      })
    } else{
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
