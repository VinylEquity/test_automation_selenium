import { expect, type Locator, type Page } from '@playwright/test';

export class signInPage {
    readonly page: Page;
    readonly signup_button: Locator;
    readonly error: Locator;
    readonly email: Locator;
    readonly ErrorOutlineIcon: Locator;
    readonly loginAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signup_button = page.getByTestId('signup_button');
        this.error = page.getByTestId('error');
        this.email = page.getByLabel('Email Address');
        this.ErrorOutlineIcon = page.getByTestId('ErrorOutlineIcon');
        this.loginAlert = page.locator('[id="__next"]').getByRole('alert');
    }
    
    async fill_email(email){
        await this.email.fill(email);
    }
    
    async click_signin(){
        await this.signup_button.click();
    }

    async validate_signin_disabled(){
        await expect(this.signup_button).toBeDisabled();
    }

    async login(email){
        await this.fill_email(email);
        await this.click_signin();
    }

    async validate_error(error_msg){
        await expect(this.error).toBeVisible();
        await expect(this.error).toHaveText(error_msg);
        await this.validate_signin_disabled();
    }
    
    async validate_alert(alert_msg){
        await expect(this.ErrorOutlineIcon).toBeVisible();
        await expect(this.loginAlert).toHaveText(alert_msg);
    }
}