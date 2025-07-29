import os

env = os.environ.get('DJANGO_ENV')

if env == 'production':
    from .production import *
else:
    from .local import *