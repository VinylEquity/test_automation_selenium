import { expect, type Locator, type Page } from '@playwright/test';


export class treasuryOrderPage {
    readonly page: Page;
    readonly select_issuer_profile: Locator;
    readonly create_treasury_order: Locator;
    readonly order_name: Locator;
    readonly issue: Locator;
    readonly issue_option_1: Locator;
    readonly reason: Locator;
    readonly reason_option_1: Locator;
    readonly description: Locator;
    readonly effective_date: Locator;

    constructor(page: Page){
        this.page = page;
        this.select_issuer_profile = page.getByRole('button', { name: 'Select an Issuer Profile' });
        this.create_treasury_order = page.getByRole('button', { name: 'Create New Order' });
        this.order_name = page.locator('div').filter({ hasText: /^Treasury Order Name$/ }).getByRole('textbox');
        this.issue = page.getByLabel('Issue').first();
        this.reason = page.getByLabel('Issue').nth(1);
        this.reason_option_1 = page.getByRole('option', { name: 'IPO' });
        this.description = page.locator('div').filter({ hasText: /^Description$/ }).getByRole('textbox');
        this.effective_date = page.locator('div').filter({ hasText: /^Effective Date$/ }).getByLabel('Choose date');
    }

    async select_issuer(issuer){
        await this.select_issuer_profile.click();
        await this.page.getByRole('option', { name: issuer }).click();
    }

    async enter_TO_details(name, issue, reason, description){
        await this.order_name.fill(name);
        await this.issue.click();
        await this.page.getByRole('option', { name: issue }).click();
        await this.reason.click();
        await this.page.getByRole('option', { name: reason }).click();
        await this.description.fill(description);
    }

    // currently selects the current date as effective date
    async select_effective_date(){
        var date = String(new Date().getDate()).padStart(2, '0')
        await this.effective_date.click();
        await this.page.getByRole('gridcell', { name: date }).click();
    }
}