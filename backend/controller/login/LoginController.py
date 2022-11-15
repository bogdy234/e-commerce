from libs.LogHandler import LogHandler

class LoginController:

    def __init__(self) -> None:
        self.log_msg = LogHandler("login_controller.log")
    
    def login(self,email,password):
        self.log_msg.log(f"START LOGIN FOR EMAIL: {email}")