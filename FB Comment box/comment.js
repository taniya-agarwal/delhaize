// reply button
// like count
// on click like incrementValue
// At top in input box post click add comment. new Date().getTime()

// step 3 initialize the sample json object

let containerId = null;
let comment = [
  {
    id: "1",
    name: "Rajat",
    avatar:
      "http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg",
    time: 1538664258172,
    likeCount: 20,
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iurelaudantium",
    replies: [
      {
        id: "1_1",
        name: "Rajat",
        avatar:
          "http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg",
        time: 1538664258172,
        likeCount: 2,
        description:
          " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iurelaudantium"
      },
      {
        id: "1_2",
        name: "Rajat",
        avatar:
          "http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg",
        time: 1538664258172,
        likeCount: 200,
        description:
          " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iurelaudantium"
      }
    ]
  }
];

// Calculate human redable time difference
function getTimeDifference(inputTime) {
  let currentTime = new Date();
  var diff = (currentTime.getTime() - inputTime) / 1000;
  let hours = Math.floor(diff / 3600);
  diff = diff % 3600;
  let minutes = Math.floor(diff / 60);
  let seconds = diff % 60;
  let returnString =
    (hours > 0 ? hours + " hours " : "") + minutes + " mins ago";
  return returnString;
}

// Add new comment
function addComment() {
  comment.push({
    name: "Rajat",
    avatar:
      "http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg",
    time: 1538664258172,
    likeCount: 20,
    description: document.getElementById("commentData").value,
    replies: []
  });

  renderData();
}


// Render the comment and reply from json or persit data
function renderData() {
  var container = document.getElementById(containerId);
  // initalize comment box input
  var htmlString = `<li><div>
  <input type='text' id="commentData" placeholder="comment" />
  <button class='post-comment' onclick="addComment()">Post</button>
</div></li>`;
// iterate over json data
  comment.forEach((item, index) => {
    htmlString += `
        <li>
            <div class="comment-main-level" >
                <!-- Avatar -->
                <div class="comment-avatar"><img src="${
                  item.avatar
                }" alt=""></div>
                
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name by-author"> 
                            <span onclick="showReplyBox(${index})"> &#9650;</span>
                            <span onclick="hideReplyBox(${index})"> &#9660;</span>
                            <a href="http://creaticode.com/blog">${
                              item.name
                            }</a>
                        </h6>
                        <span>${getTimeDifference(item.time)}</span>
                        <span id='Likebtn' onClick=decreaseLike(${index})>DisLikes: </span>
                        <i class="likeCount" >${
                          item.likeCount
                        }<span id='Likebtn' onClick=updateLike(${index})>Likes: </span></i>
                        <i class="likeCount" ><span id='Replybtn' onClick=reply(${index})>Reply </span></i>
                    </div>
                    <div class="comment-content">${item.description}</div>
                </div>
            </div>

            <div class="hiddenTextBox" id=${"container" + index}>
                <input type='text' id=${"commentData" +
                  index} placeholder="comment">
                <button class='post-comment' onclick="addReply(${index})">Post</button>
            </div>
        
            <ul class="comments-list reply-list" id="${"replyContainer-" +
              index}">`;
                        // Iterate over comment replies
    item.replies.forEach((reply, childIndex) => {
      htmlString += `
                <li>
                    <div class="comment-avatar"><img src="${
                      reply.avatar
                    }" alt=""></div>
                    
                    <div class="comment-box">
                        <div class="comment-head">
                            <h6 class="comment-name">
                                <a href="http://creaticode.com/blog">${
                                  reply.name
                                }</a>
                            </h6>
                            <span>${getTimeDifference(reply.time)}</span>
                            <span id='Likebtn' onClick=decreaseReplyLike(${index +
                              "," +
                              childIndex})>DisLikes: </span>
                            <i class="likeCount" >${
                              reply.likeCount
                            }<span id='Likebtn' onClick=updateReplyLike(${index +
        "," +
        childIndex})>Likes: </span></i>
                            <i class="fa fa-reply"></i>
                            <i class="fa fa-heart"></i>
                        </div>
                        <div class="comment-content">
                            ${reply.description}
                        </div>
                    </div>
                </li>`;
    });

    htmlString += `  
            </ul>
        </li>`;
  });

  // Append html to the given container
  container.innerHTML = htmlString;
}


// Increase Like of comment
function updateLike(index) {
  comment[index].likeCount += 1;
  renderData();
}

// Decrese Like
function decreaseLike(index) {
  comment[index].likeCount -= 1;
  renderData();
}

function updateReplyLike(parent, child) {
  comment[parent].replies[child].likeCount += 1;
  renderData();
}

function decreaseReplyLike(parent, child) {
  comment[parent].replies[child].likeCount -= 1;
  renderData();
}

// Show reply box on click 
function showReplyBox(index) {
  const replyContainer = "replyContainer-" + index;
  document.getElementById(replyContainer).classList.add("active");
}

// Hide reply box on click 
function hideReplyBox(index) {
  const replyContainer = "replyContainer-" + index;
  document.getElementById(replyContainer).classList.remove("active");
}

// Show input box for reply
function reply(index) {
  document.getElementById("container" + index).style.display = "block";
}

// Add reply to comment on post click
function addReply(index) {
  comment[index].replies.push({
    name: "Rajat",
    avatar:
      "http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg",
    time: new Date().getTime(),
    likeCount: 0,
    description: document.getElementById("commentData" + index).value
  });
  renderData();
}


function CreateCommentSection(id) {
  containerId = id;
  renderData();
}

// Step 1 - Initialize the comment with given ID
window.onload = CreateCommentSection("comments-list");
