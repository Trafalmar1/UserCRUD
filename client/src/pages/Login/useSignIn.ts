import { FormEvent, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import { email, notEmpty } from "utils/validators";
import { useDispatch } from "react-redux";
import { signIn } from "redux/actions/authActions";

type Value = {
  value: string;
  validators: Function[];
  valid: boolean;
  touched: boolean;
};

type SignUpFormData = {
  email: Value;
  password: Value;
};

const initialData: SignUpFormData = {
  email: {
    value: "",
    validators: [email, notEmpty],
    valid: true,
    touched: false,
  },
  password: { value: "", validators: [notEmpty], valid: true, touched: false },
};

const useSignIn = () => {
  const [form, setForm] = useState<SignUpFormData>(initialData);
  const dispatch = useDispatch();

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
      return;
    }

    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    const loginCallBack = (res: string) => {
      if (res === "success") {
        successToast(`Logged in as ${data.email}`);
      } else {
        errorToast("Email or password is incorrect");
      }
    };

    dispatch(signIn({ ...data }, loginCallBack));
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

export default useSignIn;
