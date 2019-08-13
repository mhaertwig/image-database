Image database based on the [Django Web Framework](https://www.djangoproject.com/) in the backend and [React](https://reactjs.org/) for the frontend.
The repository contains an [Ansible](https://www.ansible.com/) configuration for deploying the application to a Linux server.
Technologies used for the deployment are [NGINX](https://www.nginx.com/), [Gunicorn](https://gunicorn.org/) and a [PostgreSQL](https://postgresql.org) database.

## Project structure

```
project
|
└─ ansible  # Ansible configuration 
|
└─ climage_project  # Django project
|
└─ core  # Django app
|
└─ frontend  # Frontend application bootstrapped using Create React App
```

## Frontend installation

In the frontend directory, you can run `yarn install` to install all dependencies
and `yarn start` to tun the app.


## Backend installation

Create a virtualenv and install the requirements:
```bash
pip install -r requirements.txt
```

Set up a PostgreSQL database, and add the credentials to the ini file:
```bash
cp development.ini.dist development.ini
vi development.ini (enter credentials)
```

Run all migrations and start the app.
```bash
python manage.py migrate
python manage.py runserver
```
