# Treasury Orders steps
#**********************
import random
import string
import time, os
from behave import *

@step(u'I logged in as TASP And Im in Dashboard Page')
def step_impl(context):
    context.driver.get(os.getenv('APP_HOST') + 'signin')
    context.signInPage.fill_email(os.getenv('TA_USER'))
    context.signInPage.sign_in()
    time.sleep(100)
    assert context.driver.current_url == os.getenv('APP_HOST') + 'dashboard'

@step(u'I expand Issuers from menu')
def step_impl(context):
    context.dashboardPage.expand_issuers_menu()
    time.sleep(2)

@step(u'I should be able to see Treasury Orders option in the menu')
def step_impl(context):
    assert context.dashboardPage.is_treasury_order_displayed() == "Treasury Orders"

@step(u'I click on Treasury Orders option')
def step_impl(context):
    context.dashboardPage.click_onTO()

@step(u'I should be navigated to Treasury Orders page')
def step_impl(context):
    time.sleep(10)
    assert context.driver.current_url == os.getenv('APP_HOST') + 'issuers/treasury-orders'

@step(u'Create new order button is disabled And I should see Select an Issuer Profile')
def step_impl(context):
    time.sleep(5)
    assert context.treasuryOrderPage.is_createTO_enabled() ==  False
    assert context.treasuryOrderPage.is_issuers_list_displayed() == True

@step(u'I select any Issuer profile from the dropdown')
def step_impl(context):
    context.treasuryOrderPage.select_issuer(4)
    time.sleep(5)

@step(u'Create new order button should be enabled')
def step_impl(context):
    assert context.treasuryOrderPage.is_createTO_enabled() == True

@step(u'I should see the list of orders for the issuer selected')
def step_impl(context):
    assert context.treasuryOrderPage.is_TO_table_displayed() == True

@step(u'I click on new order button')
def step_impl(context):
    context.treasuryOrderPage.click_create_to()

@step(u'I should see the add new order page')
def step_impl(context):
    time.sleep(5)
    assert context.driver.current_url == os.getenv('APP_HOST') + "issuers/treasury-orders/create?type=ISSUANCE"

@step(u'I enter the Treasury order name And I select issue from the drpdown And Description is disabled')
def step_impl(context):
    time.sleep(5)
    context.treasuryOrderPage.fill_TO_name(f"Test {random.randint(1, 9999)}")
    context.treasuryOrderPage.select_issue(3)
    assert context.treasuryOrderPage.is_description_enabaled() == False


@step(u'I select reason for issuance from the dropdown')
def step_impl(context):
    context.treasuryOrderPage.select_reason(8)

@step(u'Description is enabled')
def step_impl(context):
    time.sleep(30)
    assert context.treasuryOrderPage.is_description_enabaled() == True