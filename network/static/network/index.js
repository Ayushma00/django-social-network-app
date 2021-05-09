document.addEventListener('DOMContentLoaded', function() {
  view_post()
  $('#page_number').on('click','.page',function(event){
              let page_no = parseInt($(this).data("pgno"));
              let max_val = parseInt($(this).data("max_val"));
              let max_page = Math.ceil(max_val / 10);

              $('.posts').hide();

              if(page_no < max_page){
                for(let i = 0 + 10*(page_no-1); i<10+ 10*(page_no-1);i++){
                  $(`#post${i}`).show();
                }
              }
              else{
                for(let i = 0 + 10*(page_no-1); i<max_val;i++){
                  $(`#post${i}`).show();
                }
              }
                window.location.href = "#top";
      });
  textarea = document.querySelector("#compose-body");
  textarea.addEventListener('input', autoResize, false);
  function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  }
  document.querySelector('#but1').addEventListener('click', () => {

    fetch('/post', {
        method: 'POST',
        body: JSON.stringify({
          body: document.querySelector('#compose-body').value

        })
      })
      .then(response => response.json())
      .then(result => {

      });
  });
  // love react
  $('#post_view').on('click', '.love-react', function(event) {

    console.log($(this).data("postid"));
    fetch('/like_unlike', {
        method: 'PUT',
        body: $(this).data("postid")
      })
      .then(response => response.json())
      .then(result => {
        if (result.flag === "Yes") {
          console.log("yes");

          $(`#lp${$(this).data("postid")}`).attr('src', "static/network/loveafter.svg");
        } else {
          console.log("no");
          $(`#lp${$(this).data("postid")}`).attr('src', "static/network/lovebefore.svg");
        }
        $(`#l${$(this).data("postid")}`).html(`${result.love_num}`);

      });

    console.log("again");
  });

  // edit post
  $('#post_view').on('click', '.edit', function(event) {

    let text = $(`#body${$(this).data("tweetid")}`).html();
    $(`#body${$(this).data("tweetid")}`).hide();
    console.log(text);
    $(`#editbody${$(this).data("tweetid")}`).text(text);
    $(`#e${$(this).data("tweetid")}`).show();

  });

  $('#post_view').on('click', '.username', function(event) {
 let name=$(this).data("username");
 console.log(name);
 window.location.href = `/user/${name}`;

  });

  // on save the edits
  $('#post_view').on('click', '.save', function(event) {

    console.log($(this).data("tweetid"));
    fetch('/edit_post', {
        method: 'PUT',
        body: JSON.stringify({
          body: $(`#editbody${$(this).data("tweetid")}`).val(),
          tweet_id: $(this).data("tweetid")
        })
      })

      .then(response => response.json())
      .then(result => {
        $(`#body${$(this).data("tweetid")}`).html(`${result.body}`);
        $(`#editbody${$(this).data("tweetid")}`).hide();
        $(`#save${$(this).data("tweetid")}`).hide();
        $(`#body${$(this).data("tweetid")}`).show();

      });




  });

});






function view_post() {
  fetch('/tweets_api')
    .then(response => response.json())
    .then(data => {
      let all_data_len=data.length;
            for(let i=1; i <= Math.ceil(all_data_len / 10);i++){
              let li = document.createElement('li');
              li.setAttribute('class', 'page-item')
              li.innerHTML = `<p style="cursor: pointer;" class="page-link text-primary page" data-max_val = "${all_data_len}" data-pgno ="${i}" >${i}</p>`;
              document.querySelector('#page_number').append(li);
              }



      for (let j = 0; j < data.length; j++) {
        let all_tweet = document.createElement("all_tweet")
        all_tweet.setAttribute('id', `post${j}`)
        all_tweet.setAttribute('class', `posts`)
        let image_scr
        if (data[j].flag === "Yes") {
          image_scr = "static/network/loveafter.svg"
        } else {
          image_scr = "static/network/lovebefore.svg"
        }



        all_tweet.innerHTML = `<div class="border-top-0 p-2 bg-light rounded mb-3" >
  <p style="text-align : left"><span data-username="${data[j].user}" style="cursor:pointer;" class="h5 text-info text-capitalize username">${data[j].user}</span>
  <span id="edit${data[j].id}" data-tweetid="${data[j].id}" class="float-right m-0 text-primary edit" style="float:right;cursor:pointer;">Edit</span></p>
<!-- for body content -->
    <hr><p id="body${data[j].id}"data-tweetid="${data[j].id}" class="text-primary">${data[j].body}</p>
    <!-- for edit body -->
    <p id="e${data[j].id}" >
     <textarea data-tweetid="${data[j].id}" id="editbody${data[j].id}" name="name" rows="8" cols="80"></textarea>
     <input data-tweetid="${data[j].id}" class="save" id="save${data[j].id}" type="submit" name="" value="Save"></p>
     <!-- for like post -->
    <p   class="p-1 border-top">
<span id="l${data[j].id}" class="float-left mt-1 mr-2">  ${data[j].love}  </span>
<input id="lp${data[j].id}"  data-postid="${data[j].id}" class="love-react mt-2"  type="image" src=${image_scr} width="18" height="18" alt="submit"/>
<span class="float-right">${data[j].timestamp}</span>
</p>
    </div>`

        document.querySelector('#post_view').append(all_tweet)

        if (data[j].edit === "Yes") {

          $(`#edit${data[j].id}`).show();
          $(`#e${data[j].id}`).hide();

        } else {
          $(`#edit${data[j].id}`).hide();
          $(`#e${data[j].id}`).hide();
        }
      }
      if(all_data_len>9){
      for(let k=10;k<all_data_len;k++){
        $(`#post${k}`).hide();
      }}
    });
}
