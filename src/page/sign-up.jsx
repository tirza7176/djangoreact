/*import Input from "../component/input";
import { useFormik } from "formik";
import Joi from "joi";
import userService from "../services/userService";
import { useAuth } from "../context/authcontext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
function register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { createUser, user, loginWithToken } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const { getFieldProps, handleSubmit, handleReset, touched, errors, isValid } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        username: "",
        email: "",
        password: "",
      },

      validate: (values) => {
        const userSchema = Joi.object({
          username: Joi.string().min(2).max(256).required(),
          email: Joi.string().min(6).max(255).required().email({ tlds: false }),
          password: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .required(),
        });
        const { error } = userSchema.validate(values, { abortEarly: false });
        if (!error) {
          return null;
        }
        const errors = {};
        for (const detail of error.details) {
          errors[detail.path[0]] = detail.message;
        }
        return errors;
      },

      onSubmit: async (values) => {
        try {
          const response = await createUser({
            ...values,
          });
          const { jwt, user } = response.data;
          loginWithToken(user, jwt);
          console.log("axios headers", axios.defaults.headers);
          console.log(response.data);

          setSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (err) {
          if (err.response?.status === 400) {
            setIsRegistered(true);
          }
        }
      },
    });

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded-4">
        <div className="card-header bg-secondary text-white text-center rounded-top-4">
          <h2 className="my-2">Registration Form</h2>
        </div>
        <div className="card-body p-4 bg-secondary-subtle">
          {success && (
            <div className="alert alert-info" role="alert">
              User successfully created
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="bg-secondary-subtle"
          >
            <div className="row g-3 mb-4">
              <Input
                {...getFieldProps("username")}
                error={errors.username}
                type="text"
                label="username"
                placeholder=""
                required
              />

              <Input
                {...getFieldProps("email")}
                error={
                  isRegistered
                    ? "Email already exists"
                    : touched.email
                    ? errors.email
                    : ""
                }
                type="email"
                label="Email"
                placeholder=""
                required
              />

              <Input
                {...getFieldProps("password")}
                error={errors.password}
                type="password"
                label="Password"
                placeholder=""
                required
              />
            </div>
            <div className="row g-5 mb-4 justify-content-center">
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="reset"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setIsRegistered(false);
                    handleReset();
                  }}
                >
                  <i className="bi bi-arrow-repeat"></i> Reset
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100"
                  disabled={!isValid}
                >
                  send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default register;
*/
