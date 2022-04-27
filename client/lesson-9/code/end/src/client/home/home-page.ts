import { AuthService } from "../login/auth-service";
import { User } from "../model/user";

class HomePage {
  private page: HTMLElement;
  private user?: User | null;

  private loggedInTemplate: string;
  private loggedOutTemplate: string;

  constructor(
    page: HTMLElement,
    loggedInTemplate: string,
    loggedOutTemplate: string
  ) {
    this.page = page;
    this.loggedInTemplate = loggedInTemplate;
    this.loggedOutTemplate = loggedOutTemplate;
  }

  public async initialize() {
    this.user = await AuthService.getProfile();
    this.render();
  }

  public render() {
    if (this.user) {
      const content = this.loggedInTemplate.replace("{user}", `${this.user.firstName}`);
      this.page.innerHTML = content;
      this.handleLogout();
    } else {
      this.page.innerHTML = this.loggedOutTemplate;
    }
  }

  private handleLogout() {
    const logoutLink = this.page.querySelector("a.logout");
    logoutLink.addEventListener("click", (event: Event) => {
      event.preventDefault();
      AuthService.authToken = null;
      this.user = null;
      this.render();
    });
  }
}

((page: HTMLElement, loggedInTpl: string, loggedOutTpl: string) => {
  const homePage = new HomePage(page, loggedInTpl, loggedOutTpl);
  homePage.initialize();
})(
  document.querySelector(".home-page"),
  document.getElementById("logged-in").innerText,
  document.getElementById("logged-out").innerText
);
