from django.contrib import admin
from django.urls import path, include
import blog.views as views
from django.http import HttpResponse

urlpatterns = [
    path('blog/', lambda request: HttpResponse("Static response ✅")),
    path('create/',views.CreatePost.as_view(), name="create"),
    path('update/',views.UpdatePost.as_view(), name="update"),
    path('delete/',views.DeletePost.as_view(), name="delete"),
    path('register/',views.RegisterForm.as_view(), name="register"),
    path('login/',views.LoginForm.as_view(), name="login"),
    path('logout/',views.LogoutView.as_view(), name="logout"),
    path('api/csrf/',views.GetCSRToken.as_view(),name='get-csrf'),
]