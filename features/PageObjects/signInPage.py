import time

from seleniumpagefactory.Pagefactory import PageFactory

class SignInPage(PageFactory):
    def __init__(self, driver):
        super().__init__()
        self.driver = driver

    locators = {
        'email': ('XPATH', '//*[@id="email_address"]'),
        'sign_in_btn': ('XPATH', '//*[@id="__next"]/div/div/div/div[1]/div/div/div/div/div/div[3]/form/div[2]/div/div/button'),
        'error_message': ('XPATH', '//*[@id="error_email_address"]'),
        'error_notification': ('XPATH', '//*[@id="__next"]/div[2]/div')
    }

    def fill_email(self, email):
        time.sleep(2)
        self.email.send_keys(email)

    def sign_in(self):
        self.sign_in_btn.click()

    def displayed_error_message(self):
        return self.error_message.is_displayed()

    def is_signIn_btn_disabled(self):
        return self.sign_in_btn.is_enabled()

    def get_error_message(self):
        assert self.error_message.is_displayed() == True
        return self.error_message.text

    def get_error_notification(self):
        assert self.error_notification.is_displayed() == True
        return self.error_notification.text