import { ValidationError } from "yup";

import { LoginSchema } from "../../server/users/login-schema";
import { AuthService } from "./auth-service";

class LoginForm {
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private formMessage: HTMLParagraphElement;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.initialize();
  }

  public initialize() {
    this.submitButton = this.form.querySelector("button[type='submit']") as HTMLButtonElement;
    this.formMessage = this.form.querySelector(".form-message");
    this.form.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();
      this.hideErrors();
      this.submitButton.setAttribute("disabled", "true");
      await this.login();
      this.submitButton.removeAttribute("disabled");
    });
  }

  private async login() {
    try {
      const formData = new FormData(this.form);
      const credentials = await LoginSchema.validate({
        username: formData.get("username"),
        password: formData.get("password"),
      }, {
        abortEarly: false,
      });
      await AuthService.login(credentials.username, credentials.password);
      window.location.href = "profile.html";
    } catch (error) {
      this.displayError(error);
    }
  }

  private displayError(error: ValidationError) {
    if (Array.isArray(error.inner) && error.inner.length > 0) {
      error.inner.forEach((field) => {
        this.createErrorLabel(field);
      });
    } else if (error.message) {
      this.formMessage.innerText = error.message;
      !this.formMessage.classList.contains("error") && this.formMessage.classList.add("error");
    }
  }

  private createErrorLabel({ path, errors }: ValidationError) {
    const existing = this.form.querySelector(`label.error[for='${path}']`) as HTMLLabelElement;
    const input = this.form.querySelector(`input[name="${path}"]`);
    !input.classList.contains("error") && input.classList.add("error");
    if (existing) {
      existing.innerText = errors[0];
      existing.style.display = undefined;
    } else {
      const label = document.createElement("label");
      label.innerText = errors[0];
      label.classList.add("error");
      label.setAttribute("for", path)
      input.parentNode.insertBefore(label, input.nextSibling);
    }
  }

  private hideErrors() {
    const errorLabels = this.form.querySelectorAll("label.error");
    const inputs = this.form.querySelectorAll("input.error");
    Array.from(errorLabels).forEach((label: HTMLLabelElement) => {
      label.style.display = "none";
    });
    Array.from(inputs).forEach((input: HTMLInputElement) => {
      input.classList.remove("error");
    });
  }
};


((form) => {
  const page = new LoginForm(form);
})(document.querySelector("FORM[name='login']"));
