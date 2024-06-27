FROM 639885198750.dkr.ecr.us-east-1.amazonaws.com/cruddur-python:3.10-slim-buster

# Inside Container
# make a new folder inside container
WORKDIR /backend-flask

# Outside Container -> Inside Container
COPY requirements.txt requirements.txt

# Inside the container
# this contains the libraries we want to install to run the app
RUN pip3 install -r requirements.txt

# Outside the container -> Inside the container
# . means everything in the current directory
# first period . - /backend-flask (outside container)
# second period . - /backend-flask (inside container)
COPY . .

EXPOSE ${PORT}

# CMD (Command)
CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=4567","--no-debug", "--no-debugger", "--no-reload"]