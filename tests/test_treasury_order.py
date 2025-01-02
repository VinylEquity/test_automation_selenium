import os
import re
from dotenv import load_dotenv
from playwright.sync_api import Page,expect
load_dotenv()

import re
from playwright.sync_api import Page, expect


def test_example(page: Page) -> None:
    page.goto("https://sandbox.transferge.com/signin")
    page.get_by_label("Email Address").fill("dilip.kumar+qata@vinylequity.com")
    page.get_by_test_id("signup_button").click()
    page.get_by_test_id("SuccessOutlinedIcon").click()
    page.get_by_text("Signin request sent. Please").click()
    page.get_by_label("close").click()
    # page.goto("https://sandbox.transferge.com/verify/phone-number")
    # page.get_by_label("Please enter verification").fill("6")
    # page.get_by_label("Character 2").fill("0")
    # page.get_by_label("Character 3").fill("3")
    # page.get_by_label("Character 4").fill("2")
    # page.get_by_label("Character 5").fill("8")
    # page.get_by_label("Character 6").fill("9")
    page.goto("https://sandbox.transferge.com/dashboard")
    expect(page.get_by_role("button", name="Issuers")).to_be_visible()
    page.get_by_role("button", name="Issuers").click()
    expect(page.get_by_role("link", name="theme-icon Treasury Orders")).to_be_visible()
    page.get_by_role("link", name="theme-icon Treasury Orders").click()
    expect(page.get_by_role("button", name="Create New Order")).to_be_visible()
    expect(page.get_by_role("button", name="Create New Order")).to_be_disabled()
    page.get_by_role("button", name="Select an Issuer Profile").click()
    page.get_by_role("heading", name="Wayne Industries", exact=True).click()
    expect(page.get_by_role("button", name="Create New Order")).to_be_visible()
    expect(page.get_by_role("button", name="Create New Order")).to_be_enabled()
    page.get_by_role("button", name="Create New Order").click()
