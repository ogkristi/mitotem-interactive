from dotenv import load_dotenv, find_dotenv
from robot.libraries.BuiltIn import BuiltIn
from selenium.webdriver.remote.webelement import WebElement

load_dotenv(find_dotenv())


class TestLib:
    def choose_multiple_files(self, locator: WebElement | str, *file_paths: str):
        selenium = BuiltIn().get_library_instance("SeleniumLibrary")
        selenium.find_element(locator).send_keys("\n".join(file_paths))
