import { expect, type Locator, type Page } from '@playwright/test';

export class phoneVerificationPage {
    readonly page: Page;
    readonly char_1: Locator;
    readonly char_2: Locator;
    readonly char_3: Locator;
    readonly char_4: Locator;
    readonly char_5: Locator;
    readonly char_6: Locator;
    readonly invalid_otp_alert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.char_1 = page.getByLabel('Please enter verification');
        this.char_2 = page.getByLabel('Character 2');
        this.char_3 = page.getByLabel('Character 3');
        this.char_4 = page.getByLabel('Character 4');
        this.char_5 = page.getByLabel('Character 5');
        this.char_6 = page.getByLabel('Character 6');
        this.invalid_otp_alert = page.locator('[id="__next"]').getByRole('alert');
    }

    async fill_otp(){
        await this.char_1.fill('1');
        await this.char_2.fill('2');
        await this.char_3.fill('3');
        await this.char_4.fill('4');
        await this.char_5.fill('5');
        await this.char_6.fill('6');
    }

    async fill_wrong_otp(){
        await this.char_1.fill('1');
        await this.char_2.fill('2');
        await this.char_3.fill('3');
        await this.char_4.fill('4');
        await this.char_5.fill('5');
        await this.char_6.fill('1');
    }

    async validate_otp_alert(alert_msg){
        await expect(this.invalid_otp_alert).toBeVisible();
        await expect(this.invalid_otp_alert).toHaveText(alert_msg);
    }
}