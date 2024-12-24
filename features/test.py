import os

from dotenv import load_dotenv
from selenium import webdriver
# load_dotenv()
# print(type(os.getenv('HOST')))
# print(os.getenv('HOST'))
driver = webdriver.Chrome()
driver.get("https://sandbox.transferge.com/signin")