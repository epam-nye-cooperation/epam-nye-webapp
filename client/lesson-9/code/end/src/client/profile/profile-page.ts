import { AuthService } from "../login/auth-service";
import { User } from "../model/user";

class ProfilePage {

  public template: string;
  private page: HTMLElement;
  private user: User;

  constructor(page: HTMLElement) {
    this.page = page;
  }

  public async initialize() {
    if (!AuthService.authToken) {
      this.redirectToLoginPage();
      return;
    }
    try {
      this.user = await AuthService.getProfile(true);
      this.handleLogout();
      this.render();
    } catch (error) {
      this.redirectToLoginPage();
    }
  }

  public render() {
    const content = this.template
      .replaceAll("{name}", `${this.user.firstName} ${this.user.lastName}`)
      .replaceAll("{email}", this.user.email);
    const container = this.page.querySelector(".user-info") as HTMLDivElement;
    container.innerHTML = content;
  }

  private handleLogout() {
    const logoutLink = this.page.querySelector('a.logout');
    logoutLink.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      AuthService.authToken = null;
      this.redirectToLoginPage();
    });
  }

  private redirectToLoginPage() {
    this.user = null;
    window.location.href = "login-form.html";
  }

}

((page: HTMLElement, profileTemplate) => {
  const profilePage = new ProfilePage(page);
  profilePage.template = profileTemplate;
  profilePage.initialize();
})(
  document.querySelector("main"),
  document.getElementById("profile-template").innerText
);
