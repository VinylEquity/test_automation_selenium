import os
import re
from dotenv import load_dotenv
from playwright.sync_api import Page,expect
load_dotenv()

def test_sign_in_without_email(page: Page):
    page.goto(os.getenv('APP_HOST') + 'signin')
    page.get_by_test_id("signup_button").click()
    expect(page.get_by_test_id("error")).to_be_visible()
    expect(page.get_by_test_id("signup_button")).to_be_disabled()

def test_sign_in_with_invalid_email(page: Page):
    page.goto(os.getenv('APP_HOST') + 'signin')
    page.get_by_label("Email Address").fill("invalid@test.com")
    page.get_by_test_id("signup_button").click()
    expect(page.get_by_test_id("ErrorOutlineIcon")).to_be_visible()