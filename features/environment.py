from dotenv import load_dotenv
from selenium import webdriver
from features.PageObjects.dashboardPage import DashboardPage
from features.PageObjects.signInPage import SignInPage
from features.PageObjects.treasuryOrderPage import TreasuryOrderPage


def before_scenario(context, driver):
    load_dotenv()
    context.driver = webdriver.Chrome()
    context.driver.maximize_window()
    context.driver.implicitly_wait(30)
    context.signInPage = SignInPage(context.driver)
    context.dashboardPage = DashboardPage(context.driver)
    context.treasuryOrderPage = TreasuryOrderPage(context.driver)

def after_scenario(context, driver):
    context.driver.close()
    context.driver.quit()