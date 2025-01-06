import { test, expect } from '@playwright/test';
import { signInPage } from '../../PageObjects/signInPage'
// import {mailHelper} from "../../support/mail.helper"

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

});

test('Test IA login [Happy Path Test]', async ({page}) =>{
  
});

test('Test RO login [Happy Path Test]', async ({page}) =>{
  
});