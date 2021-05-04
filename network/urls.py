
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
    ,path("post", views.compose_tweet, name="compose"),
    path("tweets_api", views.tweet_api, name="tweet_api"),
    path("like_unlike", views.like_post, name="like_post"),
    path("edit_post",views.edit_post,name="edit_post"),
]
