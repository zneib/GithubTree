function setCanvasSize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  document.getElementById('treeCanvas').width = windowWidth - 100; // Set the Canvas size to better fit the window.
  document.getElementById('treeCanvas').height = windowHeight - 200;
}

function beginTree() {
  const username = document.getElementById('username').value;
  const userPromise = fetch(`https://api.github.com/users/${username}`);
  userPromise
    .then(data => data.json())
    .then(data => { setUserFromApi(data) })
    .catch((error) => {
      console.log(error);
    });
}

function setUserFromApi(data) {
  const horizontal = document.getElementById('treeCanvas').width / 2; // Set horizontal and vertical values to be used else where in the app.
  const vertical = document.getElementById('treeCanvas').height * .9;
  const { login, name } = data;
  drawUserNode(horizontal, vertical, login, name);
}

function drawUserNode(horizontal, vertical, login, name) {
  const div = document.createElement('div'); // Make the new user node to draw on the canvas.
  div.className = 'node';
  div.textContent = name;
  const canvas = document.getElementById('treeCanvas');
  canvas.insertAdjacentElement('afterend', div);
  const userNode = document.querySelector('.node');
  // horizontal = horizontal * .05;
  userNode.style.left = `${horizontal}px`;
  userNode.style.top = `${vertical}px`;
  if (canvas.getContext) {
    let drawLine = canvas.getContext('2d');
    drawLine.beginPath();
    drawLine.moveTo(horizontal+25, vertical-8);
    drawLine.lineTo(horizontal+25, vertical-48);
    drawLine.closePath();
    drawLine.strokeStyle = '#565656';
    drawLine.stroke();
  }
  const repoPromise = fetch(`https://api.github.com/users/${login}/repos`);
  repoPromise
    .then(data => data.json())
    .then(data => { setReposFromApi(horizontal, vertical, data)})
    .catch((error) => {
      console.log(error);
    });
}

function setReposFromApi(horizontal, vertical, data) {
  const repos = data;
  drawRepoNodes(horizontal, vertical, data);
}

function drawRepoNode(horizontal, vertical, repos) {
  const div = document.createElement('div');
  div.className = 'node'
  const canvas = document.getElementById('treeCanvas');
}