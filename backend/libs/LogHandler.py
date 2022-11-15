from datetime import datetime

class LogHandler:

    def __init__(self, filename) -> None:
        self.filename = filename

    def log(self, msg):
        with open("logs/" + self.filename, 'at') as file:
            msg_log = datetime.now().strftime("%Y-%m-%d %H:%M:%S") + ": "+ str(msg) + "\n"
            file.write(msg_log)