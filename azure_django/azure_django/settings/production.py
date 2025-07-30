import os
import sys
from .base import *
from .base import BASE_DIR

print("⚠️ USING PRODUCTION SETTINGS")
print("Loaded from:", __file__, file=sys.stderr)

DEBUG = False



ALLOWED_HOSTS = [
    os.environ.get('WEBSITE_HOSTNAME', 'localhost'), 
]

CSRF_TRUSTED_ORIGINS = [
    'https://'+os.environ.get('WEBSITE_HOSTNAME', 'localhost'),
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
