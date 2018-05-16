import { AppPage } from "./app.po";

describe("workspace-project App", () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it("should display welcome message", () => {
        const title = "Repo Search";
        page.navigateTo();
        expect(page.getParagraphText()).toEqual(`Welcome to ${title}!`);
    });
});
