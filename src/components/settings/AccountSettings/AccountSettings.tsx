import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Alert, ErrorAlert, SuccessAlert } from "../../../hooks/useAlerts";
import useLogout from "../../../hooks/useLogout";
import { useAuth } from "../../../provider/authProvider";
import { callAPI } from "../../../utils/apiService";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import { ModalWrapper, WarningModal } from "../../common/Modals/Modals";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import BasicTextField from "../../common/TextField/BasicTextField";
import SettingsField, {
  SettingsContainer,
} from "../SettingsField/SettingsField";
import styles from "./AccountSettings.module.css";

const updateAccountSchema = yup.object().shape({
  username: yup.string().min(3).max(16),
  password: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/[A-Za-z]/, "Must contain at least 1 letter")
    .matches(/\d/, "Must contain at least 1 number")
    .min(6, "Must be at least 6 characters")
    .notRequired(),
  rePassword: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .when("password", (password, schema) => {
      return password[0]
        ? schema
            .oneOf(
              [yup.ref("password")],
              "Your passwords don't match. Please try again.",
            )
            .required("Reentered password cannot be empty.")
        : schema.notRequired();
    }),
});

export type UpdateAccountFormFields = yup.InferType<typeof updateAccountSchema>;

type AccountSettingsProps = {
  pushAlert: (item: Alert) => void;
};

const AccountSettings: React.FC<AccountSettingsProps> = ({ pushAlert }) => {
  const { user, setToken } = useAuth();
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const logout = useLogout();
  const form = useForm<UpdateAccountFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(updateAccountSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    const subscription = form.watch(async (value) => {
      const isValid = await form.trigger();
      const hasPassword = !!value.password && value.password.length > 0;
      const nameIsNew = value.username !== user?.username;

      // Enable update button if form is valid and either the password is entered or username is changed
      if ((hasPassword || nameIsNew) && isValid) {
        setDisableUpdate(false);
      } else {
        setDisableUpdate(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch(), form, user]);

  const updateMutation = useMutation({
    mutationFn: (params: UpdateAccountFormFields) =>
      callAPI<{ token: string }>(`/users/update`, "PUT", {
        username: params.username,
        password: params.password,
      }),
    onSuccess: (response) => {
      setToken(response.token);
      pushAlert(
        new SuccessAlert("Account updated successfully", {
          duration: 4,
          global: true,
        }),
      );
      console.log("Account updated successfully");
    },
    onError: (err: Error) => {
      pushAlert(new ErrorAlert("An error occurred. Please try again."));
      console.log(err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => callAPI(`/users`, "DELETE"),
    onSuccess: () => {
      logout();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = (params: UpdateAccountFormFields) => {
    updateMutation.mutate(params);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <SettingsContainer>
        <SettingsField
          title="Account"
          description="Here you can manage you account"
          dataCy="account-settings-title"
        />
        <SettingsField title="Email" description="You cannot change your email">
          <p data-cy="email" className={styles.label}>
            Email: {user?.email}
          </p>
        </SettingsField>
        <SettingsField title="Username" description="Update your username">
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <BasicTextField
            key="username"
            name="username"
            placeholder="Username"
            form={form}
            className={styles.input}
            dataCy="username"
          />
        </SettingsField>
        <SettingsField title="Password" description="Update your password">
          <div className={styles.passwordFields}>
            <div>
              <label className={styles.label} htmlFor="password">
                Enter New Password
              </label>
              <BasicTextField
                key="password"
                name="password"
                form={form}
                type="password"
                autoComplete="new-password"
                placeholder="********"
                className={styles.passwordInput}
                onChangeCallback={() => form.trigger("rePassword")}
                dataCy="password"
                testId="password-input"
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="rePassword">
                Reenter your New Password
              </label>
              <BasicTextField
                key="rePassword"
                name="rePassword"
                form={form}
                type="password"
                autoComplete="new-password"
                placeholder="********"
                className={styles.passwordInput}
                dataCy="rePassword"
                testId="re-password-input"
              />
            </div>
          </div>
        </SettingsField>
        <SettingsField>
          <div>
            <CustomizableButton
              type="submit"
              disabled={disableUpdate}
              variant="primary"
              data-cy="submit"
            >
              Save Changes
            </CustomizableButton>
          </div>
        </SettingsField>
        <SettingsField
          title="Delete Account"
          description="Permanently delete your account and all its data"
        >
          <div>
            <CustomizableButton
              onClick={() => setShowDeleteModal(true)}
              type="button"
              variant="warning"
              data-cy="delete-account"
            >
              Delete Account
            </CustomizableButton>
          </div>
        </SettingsField>
      </SettingsContainer>

      {showDeleteModal && (
        <ModalWrapper onClick={() => setShowDeleteModal(false)}>
          <WarningModal>
            <Container gap="lg" style={{ maxWidth: "30rem" }}>
              <Header
                variant="secondary"
                style={{ color: "var(--gray-x-dark)" }}
                data-cy="warning-modal-header"
              >
                Are you sure?
              </Header>
              <Paragraph>
                Deleting your account is irreversible and you will lose all your
                data for all you sessions.
              </Paragraph>
              <div className={styles.btnContainer}>
                <CustomizableButton
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  data-cy="cancel-delete"
                >
                  Cancel
                </CustomizableButton>
                <CustomizableButton
                  onClick={() => deleteMutation.mutate()}
                  type="button"
                  variant="strong-warning"
                  data-cy="confirm-delete"
                  data-testid="confirm-delete"
                >
                  Delete
                </CustomizableButton>
              </div>
            </Container>
          </WarningModal>
        </ModalWrapper>
      )}
    </form>
  );
};

export default AccountSettings;
