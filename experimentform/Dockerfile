# We're using 3.7.5 because we're on Django 3.10 LTS (support until 2024)
# We'll move on to higher versions of python as we move higher versions of Django
# At this moment Django 3.10 works only on 3.7, not 3.8 or version above that.
FROM python:3.7.12-slim

# Set application directory
WORKDIR /app/

# Copy your python packages file to prepare environment before tocuhing codebase
ADD requirements.txt /app/

# See if you're in right environment
RUN which python
RUN which pip

# Upgrade pip
RUN pip install --upgrade pip

# install all packages in requirements file
RUN pip install -r requirements.txt

# Move all code into the application directory
ADD . /app/

# Expose the port that you want container to run on
EXPOSE 8000

CMD [ "python", "manage.py", "migrate"]

# Run wsgi server provided by django
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
