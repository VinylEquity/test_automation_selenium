import subprocess

subprocess.run('behave -f allure_behave.formatter:AllureFormatter -o reports/', shell=True)
# subprocess.Popen('allure serve reports/', shell=True)