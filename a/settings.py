"""
Django settings for a project.

Generated by 'django-admin startproject' using Django 4.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from django.conf import settings
from django.conf.urls.static import static
import dj_database_url
from dotenv import dotenv_values


env_vars = dotenv_values('.env')
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

DJANGO_ENV = env_vars['DJANGO_ENV']

print(DJANGO_ENV,env_vars['HTTP_HOST'],env_vars['POSTGRES_DB'])


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}





# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-q-)^wo0!bh6b2gmi!h0j#9e8h4=o1ef)z$@zxi)+r4687tn*eq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = DJANGO_ENV == 'development'



ALLOWED_HOSTS = env_vars['HTTP_HOST'].split(" ")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'blog.apps.BlogConfig',
    'corsheaders'
]

MIDDLEWARE = [
    # 'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

ROOT_URLCONF = 'a.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'blog.context_processors.latest_post',
                'blog.context_processors.main_url',
            ],
        },
    },
]

WSGI_APPLICATION = 'a.wsgi.application'

CORS_ALLOWED_ORIGINS = [
    f'http://{host}' if 'localhost' or '127.0.0.1' in host else f'https://{host}'
    for host in ALLOWED_HOSTS
]

CSRF_TRUSTED_ORIGINS = [
    f'http://{host}' if 'localhost' or '127.0.0.1' in host else f'https://{host}'
    for host in ALLOWED_HOSTS
]

CORS_ALLOW_METHODS = (
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
)
CORS_ALLOW_HEADERS = (
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'db_defispace',     
        'USER': 'user_defispace',  
        'PASSWORD': '1',             
        'HOST': 'localhost',         
        'PORT': '',                 
    }
}


if DJANGO_ENV == 'production':
 
    DATABASES["default"] = dj_database_url.parse(env_vars['POSTGRES_DB'])



# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

SECURE_CONTENT_TYPE_NOSNIFF = False 
SECURE_BROWSER_XSS_FILTER = False   

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

if DJANGO_ENV == 'production':
    STATIC_ROOT = '/var/www/defispace/staticfiles/'
urlpatterns = [
    # Ваши другие URL-шаблоны здесь
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

if DJANGO_ENV == 'production':
    MEDIA_ROOT = '/var/www/defispace/media/'

