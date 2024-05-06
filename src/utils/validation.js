// AdminLoginValidation.js
import * as yup from "yup";

export const userLoginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const adminRegisterValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstname: yup.string().min(3).max(30).required(),
  lastname: yup.string().min(3).max(30).required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
  phonenumber: yup.string().min(10).max(15).required(),
});

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const validationActivationCodeSchema = yup.object().shape({
  activationcode: yup
    .string()
    .length(6, "Must be exactly 6 digits")
    .matches(/^\d+$/, "Must be a number")
    .required(),
});

export const CreateElectionValidationSchema = yup.object().shape({
  electionname: yup
    .string()
    .min(5, "Election name must be at least 3 characters")
    .max(100, "Election name must not exceed 70 characters")
    .required("Election name is required"),
  electionacronym: yup
    .string()
    .min(2, "Acronym must be at least 2 characters")
    .max(10, "Acronym must not exceed 10 characters")
    .required("Acronym is required"),
  startdate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Date cannot be earlier than today"),
  enddate: yup
    .date()
    .required("End date is required")
    .min(
      yup.ref("startdate"),
      "End date and time must be higher than start date and time"
    ),
  generalinstruction: yup
    .string()
    .max(500, "General instruction must not exceed 500 characters")
    .required("General instruction is required"),
});

export const uploadCsvSchema = yup.object().shape({
  csvFile: yup
    .mixed()
    .test("fileType", "Only CSV files are allowed", (value) => {
      return value && value[0]?.type === "text/csv";
    })
    .required("Please upload a CSV file"),
});

export const addVotersSchema = yup.object({
  voters: yup
    .array()
    .of(
      yup.object({
        fullname: yup.string().required("Fullname is required"),
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
        idnumber: yup.string().required("Identity Number is required"),
        phonenumber: yup.string().required("Phone number is required"),
        profile: yup.string().required("Voters Profile is required"),
      })
    )
    .required(),
});

export const EditElectionTimeValidationSchema = yup.object().shape({
  startdate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Date cannot be earlier than today"),
  enddate: yup
    .date()
    .required("End date is required")
    .min(
      yup.ref("startdate"),
      "End date and time must be higher than start date and time"
    ),
});
