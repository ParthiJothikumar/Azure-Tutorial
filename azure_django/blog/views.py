from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from blog.models import Post
from blog.serializers import PostSerializer
import pandas as pd
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth.models import User
from django.http import HttpResponse

# This class we can use as an inheritance to other class
# To protect the class views from access by anyone   
class ClassCSRFMixin:

    @method_decorator(csrf_protect)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args,**kwargs)
    
class GetCSRToken(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({"success":"cookie set"})
    
class RegisterForm(ClassCSRFMixin, APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        
        #If any error, then pass the 400 status code
        if not username or not password:
            return Response({"error":"Both username and password is required"},status=status.HTTP_400_BAD_REQUEST)
        
        if not email:
            return Response({"error":"email is required"},status=status.HTTP_400_BAD_REQUEST)

        #If any error, then pass the 400 status code
        if User.objects.filter(username=username).exists():
            return Response({"error":"User already exists"},status=status.HTTP_400_BAD_REQUEST)

        #For creating a new user, then pass the 201 status code
        user = User.objects.create_user(username=username,password=password,email=email)

        return Response({"sucess":" User Created Succesfully"},status=status.HTTP_200_OK)
    
class LoginForm(ClassCSRFMixin, APIView):
    permission_classes = [AllowAny]

    # While User login we need to mainly use two django built-in functions
    # Authenticate and Login
    def post(self,request):
        username = request.data['username']
        password = request.data['password']
        
        if not username or not password:
            return Response({"error":"Both username and password is required"},status=status.HTTP_400_BAD_REQUEST)

        # First it will check whether the user is present or not
        user = authenticate(request, username=username, password=password)

        if user is not None:
            #Then if user present, it will login the user
            login(request, user)
            return Response({"Success":"Logged in succesfully","data":user.username},status=status.HTTP_200_OK)
        else:
            return Response({"error":"Invalid Credentials"},status=status.HTTP_401_UNAUTHORIZED)
        

#Logout should be a post request
# Details in Django_notes --> Logout
class LogoutView(ClassCSRFMixin, APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        print(request.user.is_authenticated)

        if request.user.is_authenticated:
            logout(request)
        else:
            return Response({"error":"logged out Failed"},status=status.HTTP_400_BAD_REQUEST)

        return Response({'sucess':"Logged out"})

class BlogPost(APIView):

    def get(self,request):
         return Response("BlogPost view reached ✅")
    
class CreatePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):

        title = request.data['title']
        content = request.data['content']
        user = request.user

        if not title or not content:
            return Response({"error":"Title and Content is required"},status=status.HTTP_400_BAD_REQUEST)
        
        post = Post.objects.create(user=user,title=title,content=content)
        post.save()

        return Response({"Success":"Post Created Successfully"},status=status.HTTP_200_OK)

class UpdatePost(ClassCSRFMixin, APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        title = request.data['title']
        content = request.data['content']
        post_id = request.data['id']

        if not title or not content:
            return Response({"error":"Title and Content is required"},status=status.HTTP_400_BAD_REQUEST)
        
        post = None

        try:
            post = Post.objects.get(id=post_id)
            post.title = title
            post.content = content
            print(post)
            post.save()

        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)


        return Response({"sucess":"Post Updated Successfully"},status=status.HTTP_200_OK)
        
class DeletePost(ClassCSRFMixin, APIView):
    permission_classes= [IsAuthenticated]

    def post(self,request):
        post_id = request.data['id']
        post = None

        if not post_id:
            return Response({"error":"Post deletion failed"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            post = Post.objects.get(id=post_id)
            post.delete()
        except Exception as e:
            return Response({"error":"Post not found"},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"sucess":"Post Deleted Successfully"},status=status.HTTP_200_OK)





