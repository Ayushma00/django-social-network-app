document.addEventListener('DOMContentLoaded', function() {

  let unfollowBtn = document.querySelector('#unfollowBtn')
      if (unfollowBtn !== null) {
          unfollowBtn.onmouseover = function () {
              unfollowBtn.value = "Unfollow"
              unfollowBtn.className = "btn following-btn"
              unfollowBtn.style.backgroundColor = "pink"
          }
          unfollowBtn.onmouseout = function () {
              unfollowBtn.value = "Following"
              unfollowBtn.className = "btn following-btn"
              unfollowBtn.style.backgroundColor = "blue"
          }
      }
});
