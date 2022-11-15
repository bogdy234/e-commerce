FROM python:3.9

RUN apt-get update -y && apt-get upgrade -y

WORKDIR /backend

COPY req.txt req.txt

RUN pip install -r req.txt

COPY . .

CMD ["python","app.py"]
