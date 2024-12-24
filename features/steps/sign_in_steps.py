# Sign in Page steps
#**********************
import time, os
from behave import *

@step(u'I\'m in sign in page And I didn\'t provide any email')
def step_impl(context):
    context.driver.get(os.getenv('APP_HOST')  + 'signin')
    time.sleep(2)

@step(u'I click on sign in button')
def step_impl(context):
    context.signInPage.sign_in()
    time.sleep(1)

@step(u'It should not sign in And SignIn button should be non clickable And Error message should showup saying "Email is required" in red color near email text box')
def step_impl(context):
    assert context.driver.current_url == os.getenv('APP_HOST') + 'signin'
    assert context.signInPage.is_signIn_btn_disabled() == False
    assert context.signInPage.get_error_message() == "Email is required"

@step(u'I\'m in sign in page And I provide invalid TASP user email')
def step_impl(context):
    context.driver.get(os.getenv('APP_HOST') + 'signin')
    time.sleep(2)
    context.signInPage.fill_email("invalid@vinylequity.com")
    time.sleep(2)

@step(u'Incorrect should not sign in And SignIn button should be clickable And Error message should showup saying "ACCESS DENIED"')
def step_impl(context):
    assert context.driver.current_url == os.getenv('APP_HOST') + 'signin'
    assert context.signInPage.is_signIn_btn_disabled() == True
    assert context.signInPage.get_error_notification() == 'ACCESS DENIED'