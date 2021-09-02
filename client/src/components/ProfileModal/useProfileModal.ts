import { FormEvent, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";

import { isDate, notEmpty } from "utils/validators";
import { useDispatch } from "react-redux";
import { createProfile } from "redux/actions/profileActions";
import { ProfileData } from "api/profileApi";

type Value = {
  value: string;
  validators: Function[];
  valid: boolean;
  touched: boolean;
};

type FormData = {
  name: Value;
  gender: Value;
  birthday: Value;
  city: Value;
};

const initialData: FormData = {
  name: {
    value: "",
    validators: [notEmpty],
    valid: true,
    touched: false,
  },
  gender: {
    value: "male",
    validators: [notEmpty],
    valid: true,
    touched: false,
  },
  birthday: {
    value: "",
    validators: [notEmpty, isDate],
    valid: true,
    touched: false,
  },
  city: {
    value: "",
    validators: [notEmpty],
    valid: true,
    touched: false,
  },
};

const useProfileModal = () => {
  const [form, setForm] = useState<FormData>(initialData);
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

  const formChangeHandler = (name: keyof FormData, value: string | boolean) => {
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
    let key: keyof FormData;
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

  const submitHandler = (e: FormEvent, toggle: VoidFunction) => {
    e.preventDefault();

    if (!validate()) {
      errorToast("Form is invalid");
      return;
    }

    const data: ProfileData = {
      name: form.name.value,
      gender: form.gender.value,
      birthday: moment.utc(form.birthday.value, "DD.MM.YYYY").toISOString(),
      city: form.city.value,
    };

    const creationCallBack = (res: string) => {
      if (res === "success") {
        successToast(`Profile ${data.name} was created`);
        setForm(initialData);
        toggle();
      }
    };

    dispatch(createProfile(data, creationCallBack));
  };

  const inputBlurHandler = (name: keyof FormData) => {
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

  const resetForm = (callback?: VoidFunction) => {
    setForm(initialData);
    if (callback) callback();
  };

  return {
    inputBlurHandler,
    submitHandler,
    formChangeHandler,
    resetForm,
    form,
  };
};

export default useProfileModal;
