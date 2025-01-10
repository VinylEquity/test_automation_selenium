import { test, expect } from '@playwright/test';
import { signInPage } from '../../PageObjects/signInPage'
import { mailerMethods } from '../../support/mailer.methods';
import { phoneVerificationPage } from '../../PageObjects/phoneVerificationPage';
import { dashboardPage } from '../../PageObjects/dashBoardPage';
import { portfolioPage } from '../../PageObjects/portfolioPage';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.HOST as string) // open the app
  await expect(page.getByText('Enter Your Email To Sign In')).toBeVisible() // make sure app is in login page 
});

test.afterEach(async ({page}) => {
  await page.close();
});

test('Get error on sign in without email', async ({ page }) => {
  const SignInPage = new signInPage(page);
  await SignInPage.click_signin()
  await SignInPage.validate_error('Email is required');
});

test('Get error on sign in with invalid email', async ({ page }) => {
  const SignInPage = new signInPage(page);
  await SignInPage.login('invalid@test.com');
  await SignInPage.validate_alert('ACCESS DENIED');
});

test('Get error on sign in with incorrect email format', async ({ page }) => {
  const SignInPage = new signInPage(page);
  await SignInPage.enter_email('abc');
  await SignInPage.validate_signin_disabled();
});

test('Successful Transfer Agent login', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  const DashboardPage = new dashboardPage(page);
  await SignInPage.login(process.env.TA_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.TA_USER as string));
  await page.waitForURL(process.env.HOST as string + "verify/phone-number")
  await PhoneVerificationPage.enter_valid_otp();
  await page.waitForURL(process.env.HOST as string + "dashboard");
  await DashboardPage.validate_username("Automation QA");
  await DashboardPage.logout();
});

test('Successful Issuer Admin login', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  const DashboardPage = new dashboardPage(page);
  await SignInPage.login(process.env.IA_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.IA_USER as string));
  await page.waitForURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.enter_valid_otp();
  await page.waitForURL(process.env.HOST as string + "dashboard");
  await DashboardPage.validate_username("Automation QA");
  await DashboardPage.logout();
});

test('Successful Registered Owner Login', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  const PortfolioPage = new portfolioPage(page);
  await SignInPage.login(process.env.RO_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.RO_user as string));
  await page.waitForURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.enter_valid_otp();
  await page.waitForURL(process.env.HOST as string + "portfolio");
  await PortfolioPage.validate_username("automation");
  await PortfolioPage.logout();
});

test('Get error on entering invalid OTP', async ({page}) =>{
  const SignInPage = new signInPage(page);
  const PhoneVerificationPage = new phoneVerificationPage(page);
  await SignInPage.login(process.env.RO_USER as string);
  const message = await page.getByText('We have sent an email with').textContent();
  await page.goto(await mailerMethods.login_mail(message.substring(40,71), process.env.RO_user as string));
  await page.waitForURL(process.env.HOST as string + "verify/phone-number");
  await PhoneVerificationPage.enter_invalid_otp();
  await PhoneVerificationPage.validate_otp_alert('Invalid verification code. Please enter a valid code.');
});