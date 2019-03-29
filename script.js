function setCanvasSize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  document.getElementById('treeCanvas').width = windowWidth - 100; // Set the Canvas size to better fit the window.
  document.getElementById('treeCanvas').height = windowHeight - 200;
}

function beginTree() {
  const horizontal = document.getElementById('treeCanvas').width; // Set horizontal and vertical values to be used else where in the app.
  const vertical = document.getElementById('treeCanvas').height / 2;
  const username = document.getElementById('username').value;
  const user = getGithubData(username); // Pass the username and any parameters to the function that retrieves github info.
  const repos = getGithubData(username, '/repos');
  drawUserNode(horizontal, vertical);
}

function getGithubData(username, request = '') {
  let data;
  fetch(`https://api.github.com/users/${username}${request}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJSON) {
      console.log(responseJSON);
      // for (const item of Object.keys(responseJSON)) {
      //   data = responseJSON[item];
      //   console.log(data);
      // }
    })
  return data;
}

function drawUserNode(horizontal, vertical) {
  const div = document.createElement('div');
  div.className = 'node';
  const canvas = document.getElementById('treeCanvas');
  canvas.insertAdjacentElement('afterend', div);
  const userNode = document.querySelector('.node');
  horizontal = horizontal * .05;
  userNode.style.left = `${horizontal}px`;
  userNode.style.top = `${vertical}px`;
  if (canvas.getContext) {
    let drawLine = canvas.getContext('2d');
    drawLine.beginPath();
    drawLine.moveTo(horizontal+100, vertical+15);
    drawLine.lineTo(horizontal+150, vertical+15);
    drawLine.closePath();
    drawLine.strokeStyle = '#565656';
    drawLine.stroke();
  }
}

function drawRepoNode(horizontal, vertical) {
  const div = document.createElement('div');
  div.className = 'node'
  const canvas = document.getElementById('treeCanvas');
}