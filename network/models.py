from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Tweet(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="tweets")
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    # following=models.IntegerField()
    # followers=models.IntegerField()
    love = models.ManyToManyField(User,related_name="love")
    # comment = models.TextField(blank=True)

    def serialize(self,current_user):
        if current_user in self.love.all():
                flag="Yes"
        else:
            flag="No"
        if current_user != self.user:
            edit="No"
        else:
            edit="Yes"
        return {
            "id": self.id,
            "user": self.user.username,
            "body": self.body,
            "timestamp": self.timestamp.strftime("%A | %I:%M %p | %d %B, %Y"),
            "love": self.love.count(),
            "flag":flag,
            "edit":edit
            # "comment": self.comment
        }
