import time

from selenium.webdriver.common.by import By
from seleniumpagefactory.Pagefactory import PageFactory

class TreasuryOrderPage(PageFactory):
    def __init__(self, driver):
        super().__init__()
        self.driver = driver

    locators = {
        'create_to': ('XPATH', '//*[@id="__next"]/div/div/main/div/div[2]/div/div[1]/button'),
        'menu_issuers_to': ('XPATH', '//*[@id="__next"]/div/div/nav/div/div/div[2]/ul/div[2]/div/div/div/a[3]'),
        'issuers_dropdown': ('XPATH', '//*[@id="__next"]/div/div/main/div/div[2]/div/div[1]/div/div/div/div'),
        'issuers_list': ('XPATH', '//*[@id="menu-"]/div[3]'),
        'to_list': ('XPATH', '//*[@id="__next"]/div/div/main/div/div[2]/div/div[2]/div/div[2]/table'),
        'create_to_radio': ('XPATH', '//*[@id="__next"]/div/div/main/div/div[2]/div/div[1]/div[2]/label[1]'),
        'create_return_to_radio': ('XPATH', '//*[@id="__next"]/div/div/main/div/div[2]/div/div[1]/div[2]/label[2]')
    }

    def is_createTO_enabled(self):
        return self.create_to.is_enabled()

    def click_create_to(self):
        self.create_to.click()

    def is_issuers_list_displayed(self):
        return self.issuers_dropdown.is_displayed()

    def select_issuer(self, issuer):
        self.issuers_dropdown.click()
        time.sleep(3)
        self.driver.find_element(By.XPATH,f'//*[@id="menu-"]/div[3]/ul/li[{issuer}]').click()

    def is_TO_table_displayed(self):
        return self.to_list.is_displayed()

    def is_to_selected(self):
        return self.create_to_radio.is_selected()

    def is_return_to_selected(self):
        # self.create_return_to_radio.is_selected()
        self.create_return_to_radio.click()