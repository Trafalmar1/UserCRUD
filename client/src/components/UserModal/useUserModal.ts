import { FormEvent, useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import { email, notEmpty } from "utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "api/userApi";
import { updateUser } from "redux/actions/userActions";
import { RootState } from "redux/store";
import { UserReducer } from "redux/reducers/userReducer";

type Value = {
  value: string;
  validators: Function[];
  valid: boolean;
  touched: boolean;
};

export type FormData = {
  username: Value;
  email: Value;
  role: Value;
};

const initialData: FormData = {
  username: {
    value: "",
    validators: [notEmpty],
    valid: true,
    touched: false,
  },
  email: {
    value: "",
    validators: [notEmpty, email],
    valid: true,
    touched: false,
  },
  role: {
    value: "",
    validators: [notEmpty],
    valid: true,
    touched: false,
  },
};

const useUserModal = (user?: UserData) => {
  const [form, setForm] = useState<FormData>(initialData);
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector(
    (state: RootState) => state.user as UserReducer
  );

  useEffect(() => {
    setForm({
      username: {
        value: user ? user.username : "",
        validators: [notEmpty],
        valid: true,
        touched: false,
      },
      email: {
        value: user ? user.email : "",
        validators: [notEmpty, email],
        valid: true,
        touched: false,
      },
      role: {
        value: user ? user.role : "",
        validators: [notEmpty],
        valid: true,
        touched: false,
      },
    });
  }, [user]);

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

    const data: UserData = {
      username: form.username.value,
      email: form.email.value,
      role: form.role.value,
      id: user?.id,
    };

    const isLoggedInUser = user?.id === loggedInUser?.id;

    const formCallBack = (res: string) => {
      if (res === "success") {
        successToast(`Profile ${data.username} was updated`);
        setForm(initialData);
        toggle();
      } else {
        errorToast(res);
      }
    };

    dispatch(updateUser(data, { isLoggedInUser, callBack: formCallBack }));
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

export default useUserModal;
