import os
from .base import *
from .base import BASE_DIR

DEBUG = False

ALLOWED_HOSTS = [
    os.environ['WEBSITE_HOSTNAME'], 
]

CSRF_TRUSTED_ORIGINS = [
    'https://'+os.environ['WEBSITE_HOSTNAME'],
]

CORS_ALLOWED_ORIGINS = [
    'https://white-glacier-048b80e0f.1.azurestaticapps.net'
]

SECRET_KEY = os.environ['MY_SECRET_KEY']

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
