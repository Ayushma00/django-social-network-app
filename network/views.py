from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import User,Tweet, Followers


def index(request):
    return render(request, "network/index.html")

@csrf_exempt
def compose_tweet(request):
     if request.method !="POST":
         return JsonResponse({"error": "POST request required."},status=400)
     data = json.loads(request.body)

     body = data.get("body", "")
     tweet=Tweet(
     user=request.user,
     body=body
     )
     tweet.save()
     print(tweet)

     return HttpResponse("OK")
def tweet_api(request):
    tweet=Tweet.objects.all()
    tweets=tweet.order_by("-timestamp").all()
    return JsonResponse([tweet.serialize(request.user) for tweet in tweets], safe=False)




@csrf_exempt
@login_required
def like_post(request):
    if request.method !="PUT":
        return JsonResponse({"error": "POST request required."},status=400)

    post_id = json.loads(request.body)
    print(f"asa{post_id}")
    tweet=Tweet.objects.get(id=post_id)
    if request.user in tweet.love.all():
            tweet.love.remove(request.user)
            flag="No"
    else:
        tweet.love.add(request.user)
        flag="Yes"
    tweet.save()
    print("ok")
    return JsonResponse({"love_num": str(tweet.love.count()), "flag": flag})

@csrf_exempt
@login_required
def edit_post(request):
    if request.method !="PUT":
        return JsonResponse({"error": "POST request required."},status=400)

    data = json.loads(request.body)
    print(f"asa{data}")

    content = data.get("body", "")
    id=data.get("tweet_id","")
    tweet=Tweet.objects.get(id=id)
    tweet.body=content
    tweet.save()
    print("ok")
    return JsonResponse({"body":tweet.body })
def following(request):
    return None
#     if not request.user.is_authenticated:
#         return HttpResponseRedirect(reverse("login"))
#     user = User.objects.get(id=request.user.id)
#     followed_users = [followRelation.user for followRelation in user.following.all()]
#     return render(request, "network/profile.html", {
#         "followed_users": followed_users
#     })


@login_required
def profile(request,username):
    print(username)
    user_p=User.objects.get(username=username)
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponseRedirect(reverse('login'))

        if "unfollow_btn" in request.POST:
            Followers.objects.get(user=user_p, follower=request.user).delete()
        elif "follow_btn" in request.POST:
            Followers.objects.create(user=user_p, follower=request.user)
        else:
            print("Error: wrong input name")
        return HttpResponseRedirect(reverse("profile", args=(username, )))

    curr_user_follows_this_profile = False
    if request.user.is_authenticated:
        curr_user_follows_this_profile = request.user.following.filter(user=user_p.id).exists()
    print(curr_user_follows_this_profile)
    tweets=user_p.tweets.order_by("-timestamp").all()
    if request.user==user_p:
        followFlag="No"
    else:
        followFlag="Yes"
    return render(request,"network/profile.html",
    {"puser":user_p,
    "tweets":tweets,
    "followFlag":followFlag,
    "following_profile": curr_user_follows_this_profile})

@csrf_exempt
@login_required
def follow(request):
    return None


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
