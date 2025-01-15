import { test, expect } from '@playwright/test';
import { vinylPages } from '../../PageObjects/vinylPages'
import { mailerMethods } from '../../support/mailer.methods';
import { randomInt } from 'crypto';

test.describe("Vinyl Treasury Order", {tag: '@dev_sanity'}, async () => {
  let VinylPages: vinylPages;

  test.beforeEach(async ({ page }) => {
    VinylPages = new vinylPages(page);
    await page.goto(process.env.HOST as string); // open the app
    await expect(page.getByText('Enter Your Email To Sign In')).toBeVisible(); // make sure app is in login page 
    await VinylPages.SignInPage.login(process.env.TA_USER as string);
    const message = await page.getByText('We have sent an email with').textContent();
    await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.TA_USER as string));
    await page.waitForURL(process.env.HOST as string + "verify/phone-number")
    await VinylPages.PhoneVerificationPage.enter_valid_otp();
    await page.waitForURL(process.env.HOST as string + "dashboard");
  });
  
  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Create New Treasury Order and automatic release of Treasury Order', async ({ page }) => {
    const name = 'Test ' + randomInt(0,999);
    const description = 'Description Test ' + randomInt(0,999);
    await VinylPages.DashboardPage.go_to_treasury_order_page();
    await page.waitForURL(process.env.HOST as string + "issuers/treasury-orders");
    await VinylPages.TreasuryOrderPage.select_issuer(process.env.ISSUER);
    await VinylPages.TreasuryOrderPage.create_treasury_order.click();
    await page.waitForURL(process.env.HOST as string + "issuers/treasury-orders/create?type=ISSUANCE");
    await VinylPages.TreasuryOrderPage.enter_TO_details(name, process.env.ISSUE, 'IPO', description, 'Email');
    await VinylPages.TreasuryOrderPage.add_existing_automation_ro_recipient();
    await VinylPages.TreasuryOrderPage.validate_recipent_added('automation', process.env.RO_USER, process.env.RO_TIN);
    await VinylPages.TreasuryOrderPage.enter_quantity_and_price(10, 10);
    await VinylPages.TreasuryOrderPage.submit_TO();
    await VinylPages.TreasuryOrderPage.is_TO_submitted();
    await VinylPages.TreasuryOrderPage.validate_TO_details(name, description, 'IPO', process.env.ISSUER, process.env.ISSUE, 10, 'Email');
    await VinylPages.TreasuryOrderPage.validate_TO_document(name);
  });
});