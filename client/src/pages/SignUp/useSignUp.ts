import { FormEvent, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import api from "api";
import { email, notEmpty } from "utils/validators";

type Value = {
  value: string;
  validators: Function[];
  valid: boolean;
  touched: boolean;
};

type SignUpFormData = {
  username: Value;
  email: Value;
  password: Value;
  role: Value;
};

const initialData: SignUpFormData = {
  username: { value: "", validators: [notEmpty], valid: true, touched: false },
  email: {
    value: "",
    validators: [email, notEmpty],
    valid: true,
    touched: false,
  },
  password: { value: "", validators: [notEmpty], valid: true, touched: false },
  role: { value: "user", validators: [], valid: true, touched: false },
};

const useSignUp = () => {
  const [form, setForm] = useState<SignUpFormData>(initialData);
  const history = useHistory();
  const errorToast = (text: string) => {
    toast.error(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const successToast = (text: string) => {
    toast.success(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const formChangeHandler = (
    name: keyof SignUpFormData,
    value: string | boolean
  ) => {
    let isValid = true;
    for (const validator of form?.[name].validators) {
      isValid = isValid && validator(value);
    }
    setForm((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, valid: isValid },
    }));
  };

  const validate = () => {
    const newForm = _.cloneDeep(form);
    let key: keyof SignUpFormData;
    for (key in form) {
      let isValid = true;
      for (const validator of form?.[key].validators) {
        isValid = isValid && validator(form?.[key].value);
      }
      newForm[key] = { ...form?.[key] };
      newForm[key].valid = isValid;
    }
    setForm(newForm);

    let isFormValid = true;
    for (key in newForm) {
      isFormValid = isFormValid && newForm?.[key].valid;
    }
    return isFormValid;
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      errorToast("Form is invalid");
    }

    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };
    api
      .signUp(data)
      .then((res) => {
        successToast("Account was created");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputBlurHandler = (name: keyof SignUpFormData) => {
    setForm((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          touched: true,
        },
      };
    });
  };

  return { inputBlurHandler, submitHandler, formChangeHandler, form };
};

export default useSignUp;
