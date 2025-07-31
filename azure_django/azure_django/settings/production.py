import os
from .base import *
from .base import BASE_DIR
import logging

print("⚠️  hi")
logging.warning("✅ Using PRODUCTION settings file.")

DEBUG = False



ALLOWED_HOSTS = [
    'white-glacier-048b80e0f.1.azurestaticapps.net', 
]

CSRF_TRUSTED_ORIGINS = [
    'https://white-glacier-048b80e0f.1.azurestaticapps.net',
]

CORS_ALLOWED_ORIGINS = [
    'https://white-glacier-048b80e0f.1.azurestaticapps.net'
]

SECRET_KEY = 'NqP7ZdC2fWy3LmRHvT5KxAoUFgbJ91XE'

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
