import time

from seleniumpagefactory.Pagefactory import PageFactory

class DashboardPage(PageFactory):
    def __init__(self, driver):
        super().__init__()
        self.driver = driver

    locators = {
        'menu_issuers': ('XPATH', '//*[@id="__next"]/div/div/nav/div/div/div[2]/ul/div[1]'),
        'menu_issuers_to': ('XPATH', '//*[@id="__next"]/div/div/nav/div/div/div[2]/ul/div[2]/div/div/div/a[3]')
    }

    def expand_issuers_menu(self):
        time.sleep(5)
        self.menu_issuers.click()

    def is_treasury_order_displayed(self):
        self.menu_issuers_to.is_displayed()
        return self.menu_issuers_to.text

    def click_onTO(self):
        self.menu_issuers_to.click()