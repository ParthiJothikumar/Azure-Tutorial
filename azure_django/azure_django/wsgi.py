"""
WSGI config for azure_django project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

import sys

from django.core.wsgi import get_wsgi_application

settings_module = 'azure_django.settings.production'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)
print("✅ WSGI loaded with production settings", file=sys.stderr)

application = get_wsgi_application()
