import AndroidTextInput from "../android-text-input";

type FieldValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type AndroidLogInFormProps = {
  handleFieldValue: (item: Partial<FieldValues>) => void;
  fieldErrors?: Partial<Record<keyof FieldValues, string[]>>;
  fieldValues: FieldValues;
  isSignIn: boolean;
};

export default function AndroidLogInForm({
  handleFieldValue,
  fieldErrors,
  fieldValues,
  isSignIn,
}: AndroidLogInFormProps) {
  return (
    <>
      {!isSignIn && (
        <>
          <AndroidTextInput
            label="First Name"
            handleUserInput={(value) => handleFieldValue({ firstName: value })}
            errorText={fieldErrors?.firstName}
            value={fieldValues.firstName}
          />
          <AndroidTextInput
            label="Middle Name (Optional)"
            handleUserInput={(value) => handleFieldValue({ middleName: value })}
            value={fieldValues.middleName}
          />
          <AndroidTextInput
            label="Last Name"
            handleUserInput={(value) => handleFieldValue({ lastName: value })}
            errorText={fieldErrors?.lastName}
            value={fieldValues.lastName}
          />
        </>
      )}

      <AndroidTextInput
        label="Email Address"
        handleUserInput={(value) => handleFieldValue({ email: value })}
        errorText={fieldErrors?.email}
        value={fieldValues.email}
      />
      <AndroidTextInput
        label="Password"
        handleUserInput={(value) => handleFieldValue({ password: value })}
        errorText={fieldErrors?.password}
        value={fieldValues.password}
      />

      {!isSignIn && (
        <AndroidTextInput
          label="Confirm Password"
          handleUserInput={(value) =>
            handleFieldValue({ password_confirmation: value })
          }
          errorText={fieldErrors?.password_confirmation}
          value={fieldValues.password_confirmation}
        />
      )}
    </>
  );
}
