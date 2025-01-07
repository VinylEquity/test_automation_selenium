import { test, expect } from '@playwright/test';
import { signInPage } from '../../PageObjects/signInPage'
import { mailerMethods } from '../../support/mailer.methods';
import { phoneVerificationPage } from '../../PageObjects/phoneVerificationPage';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.HOST as string) // open the app
  await expect(page.getByText('Enter Your Email To Sign In')).toBeVisible() // make sure app is in login page 
});

test.afterEach(async ({page}) => {
  await page.close();
});

test('Test sign in without email', async ({ page }) => {
  const SignInPage = new signInPage(page);
  await SignInPage.click_signin()
  await SignInPage.validate_error('Email is required');
});

test('Test sign in with invalid email', async ({ page }) => {
  const SignInPage = new signInPage(page);
  await SignInPage.login('invalid@test.com');
  await SignInPage.validate_alert('ACCESS DENIED');
});

test('Test sign in with wrong email format', async ({ page }) => {
  const SignInPage = new signInPage(page);
  await SignInPage.fill_email('abc');
  await SignInPage.validate_signin_disabled();
});

test('Test TA login [Happy Path Test]', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  await SignInPage.login(process.env.TA_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.TA_USER as string));
  await expect(page).toHaveURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.fill_otp();
  await expect(page).toHaveURL(process.env.HOST as string + "dashboard");
});

test('Test IA login [Happy Path Test]', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  await SignInPage.login(process.env.IA_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.IA_USER as string));
  await expect(page).toHaveURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.fill_otp();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(process.env.HOST as string + "dashboard");
});

test('Test RO login [Happy Path Test]', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  await SignInPage.login(process.env.RO_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.RO_user as string));
  await expect(page).toHaveURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.fill_otp();
  await expect(page).toHaveURL(process.env.HOST as string + "portfolio");
});

test('Test invalid OTP', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  await SignInPage.login(process.env.RO_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.RO_user as string));
  await expect(page).toHaveURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.fill_wrong_otp();
  await PhoneVerificationPage.validate_otp_alert('Invalid verification code. Please enter a valid code.');
});