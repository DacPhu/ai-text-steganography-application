FROM python:3.11

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt


COPY . .

EXPOSE 6969

# Run the application
CMD ["python", "api.py"]
