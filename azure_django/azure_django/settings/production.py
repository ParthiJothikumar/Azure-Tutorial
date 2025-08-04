import os
from .base import *
from .base import BASE_DIR
import logging

print("⚠️  hi")
logging.warning("✅ Using PRODUCTION settings file.")

DEBUG = False


# Here we need to use Backend Endpoint
ALLOWED_HOSTS = [
    'azure-blog-fbhzgrchh3anareg.canadacentral-01.azurewebsites.net', 
]

SESSION_COOKIE_DOMAIN = "white-glacier-048b80e0f.1.azurestaticapps.net"

CSRF_COOKIE_DOMAIN = "white-glacier-048b80e0f.1.azurestaticapps.net"

#CORS is about allowing your frontend (origin) to access your backend API across domains.

#CSRF protection in Django needs to know which frontend origins are safe when sending cookies & CSRF tokens.

#So in both cases, you are telling Django:

#“I trust this frontend origin (azurestaticapps.net) to talk to me and receive/send CSRF-protected requests.”

#So we need to use Front End origin

CSRF_TRUSTED_ORIGINS = [
    'https://white-glacier-048b80e0f.1.azurestaticapps.net',
]

CORS_ALLOWED_ORIGINS = [
    'https://white-glacier-048b80e0f.1.azurestaticapps.net'
]

CSRF_COOKIE_DOMAIN = 'https://white-glacier-048b80e0f.1.azurestaticapps.net'

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
