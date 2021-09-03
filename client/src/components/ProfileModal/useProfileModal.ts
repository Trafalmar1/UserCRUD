import { FormEvent, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";

import { isDate, notEmpty } from "utils/validators";
import { useDispatch } from "react-redux";
import { createProfile, updateProfile } from "redux/actions/profileActions";
import { ProfileData } from "api/profileApi";

type Value = {
  value: string;
  validators: Function[];
  valid: boolean;
  touched: boolean;
};

export type FormData = {
  name: Value;
  gender: Value;
  birthday: Value;
  city: Value;
};

const useProfileModal = (
  mode: "creation" | "update" = "creation",
  profile?: ProfileData
) => {
  const initialData: FormData = {
    name: {
      value: profile ? profile.name : "",
      validators: [notEmpty],
      valid: true,
      touched: false,
    },
    gender: {
      value: profile ? profile.gender : "male",
      validators: [notEmpty],
      valid: true,
      touched: false,
    },
    birthday: {
      value: profile ? moment(profile.birthday).format("DD.MM.YYYY") : "",
      validators: [notEmpty, isDate],
      valid: true,
      touched: false,
    },
    city: {
      value: profile ? profile.city : "",
      validators: [notEmpty],
      valid: true,
      touched: false,
    },
  };
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

    const formCallBack = (res: string) => {
      if (res === "success") {
        successToast(
          `Profile ${data.name} was ${
            mode === "creation" ? "created" : "updated"
          }`
        );
        setForm(initialData);
        toggle();
      }
    };

    switch (mode) {
      case "update":
        data.id = profile?.id;
        dispatch(updateProfile(data, formCallBack));
        break;
      default:
        dispatch(createProfile(data, formCallBack));
    }
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
