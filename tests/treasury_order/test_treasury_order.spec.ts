import { test, expect } from '@playwright/test';
import { vinylPages } from '../../PageObjects/vinylPages'
import { mailerMethods } from '../../support/mailer.methods';
import { randomInt } from 'crypto';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.HOST as string) // open the app
  await expect(page.getByText('Enter Your Email To Sign In')).toBeVisible() // make sure app is in login page 
});

test.afterEach(async ({page}) => {
  await page.close();
});

test('Create New Treasury Order', async ({ page }) => {
  const VinylPages = new vinylPages(page);
  const name = 'Test ' + randomInt(0,999);
  const description = 'Description Test ' + randomInt(0,999);
  await VinylPages.SignInPage.login(process.env.TA_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.TA_USER as string));
  await page.waitForURL(process.env.HOST as string + "verify/phone-number")
  await VinylPages.PhoneVerificationPage.enter_valid_otp();
  await page.waitForURL(process.env.HOST as string + "dashboard");
  await VinylPages.DashboardPage.validate_username("Automation QA");
  await VinylPages.DashboardPage.go_to_treasury_order_page();
  await page.waitForURL(process.env.HOST as string + "issuers/treasury-orders");
  await VinylPages.TreasuryOrderPage.select_issuer('Proxy Issuer 01 logo Proxy Issuer');
  await VinylPages.TreasuryOrderPage.create_treasury_order.click();
  await page.waitForURL(process.env.HOST as string + "issuers/treasury-orders/create?type=ISSUANCE");
  await VinylPages.TreasuryOrderPage.enter_TO_details(name, 'Series C Common', 'IPO', description);
  await VinylPages.TreasuryOrderPage.select_effective_date();
  
  // console.log(date);
  // await page.locator('div').filter({ hasText: /^Effective Date$/ }).getByLabel('Choose date').fill(date);
  // await page.waitForTimeout(100000)
//   await page.getByRole('gridcell', { name: '10' }).click();
//   await page.getByPlaceholder('YYYY-MM-DD hh:mm aa').click();
//   await page.getByLabel('Choose date', { exact: true }).click();
//   await page.getByRole('gridcell', { name: '10' }).click();
//   await page.getByLabel('2 hours', { exact: true }).click();
//   await page.getByRole('button', { name: 'OK' }).click();
//   await page.locator('div').filter({ hasText: /^Automatic Release Date\/Time$/ }).getByLabel('Choose date, selected date is').click();
//   await page.getByLabel('20 minutes').click();
//   await page.getByLabel('25 minutes').click();
//   await page.getByRole('button', { name: 'OK' }).click();
//   await page.getByText('Email', { exact: true }).click();
//   await page.getByRole('option', { name: 'Email' }).click();
//   await page.getByText('<>').first().click();
//   await page.getByText('<>').click();
//   await page.getByText('YES').nth(1).click();
//   await page.getByText('NO').nth(1).click();
//   await page.getByRole('button', { name: 'Upload Signed Document' }).click();
//   await page.getByRole('button', { name: 'Upload' }).click();
//   await page.getByRole('button', { name: 'Upload' }).setInputFiles('sample (1).pdf');
//   await page.locator('div').filter({ hasText: 'Document Uploaded' }).nth(2).click();
//   await page.getByRole('button').first().click();
//   await page.getByLabel('Add Recipient').click();
//   await page.getByPlaceholder('Search by Legal Name, Email').click();
//   await page.getByPlaceholder('Search by Legal Name, Email').fill('automation');
//   await page.getByRole('option', { name: 'automation | automation+' }).click();
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.getByRole('cell', { name: '0', exact: true }).getByRole('textbox').click();
//   await page.getByRole('spinbutton').fill('10');
//   await page.getByRole('row', { name: 'Collapse Toggle select row' }).getByRole('textbox').first().click();
//   await page.getByRole('spinbutton').fill('11');
//   await page.getByRole('button', { name: 'Submit Order' }).click();
//   await page.locator('[id="__next"]').getByRole('alert').click();
//   await page.getByRole('link', { name: 'Details' }).click();
//   await page.getByText('-01-10 02:25 am ET').click();
//   await page.getByText('Pending Release').click();
//   await page.getByRole('link', { name: 'Status', exact: true }).click();
});