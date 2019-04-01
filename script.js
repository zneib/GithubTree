function setCanvasSize() { // Set the canvas size when the document loads.
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  document.getElementById('treeCanvas').width = windowWidth - 100; // Set the Canvas size to better fit the window.
  document.getElementById('treeCanvas').height = windowHeight - 100;
}

function resetTree() { // Clear the canvas for another user input.
  const canvas = document.getElementById('treeCanvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  const nodes = document.querySelectorAll('.node');
  nodes.forEach(node => {
    node.parentNode.removeChild(node);
  });
  document.getElementById('username').value = '';

}

function beginTree() { // Start by fetching the user name.
  const username = document.getElementById('username').value;
  const userPromise = fetch(`https://api.github.com/users/${username}`);
  userPromise
    .then(data => data.json())
    .then(data => { setUserFromApi(data) })
    .catch((error) => {
      console.log(error);
    });
}

function setUserFromApi(data) { // Setup the user information and get ready for drawing.
  const horizontal = document.getElementById('treeCanvas').width / 2; // Set horizontal and vertical values to be used else where in the app.
  const vertical = document.getElementById('treeCanvas').height * .99;
  drawUserNode(horizontal, vertical, data);
}

function drawUserNode(horizontal, vertical, data) {
  const div = document.createElement('div'); // Make the new user node to draw on the canvas.
  div.id = 'userNode';
  div.className = 'node';
  div.textContent = data.name;
  const canvas = document.getElementById('treeCanvas');
  canvas.insertAdjacentElement('afterend', div);
  const userNode = document.getElementById('userNode');
  userNode.style.left = `${horizontal}px`;
  userNode.style.top = `${vertical}px`;
  if (canvas.getContext) { // Draw the lines
    let drawLine = canvas.getContext('2d');
    drawLine.beginPath();
    drawLine.lineWidth = 1.3;
    drawLine.moveTo(horizontal+25, vertical-58);
    drawLine.lineTo(horizontal+25, vertical-88);
    drawLine.closePath();
    drawLine.strokeStyle = '#2E8E99';
    drawLine.stroke();
  }
  drawMiscUserInfo(horizontal, vertical, data);
  const repoPromise = fetch(`https://api.github.com/users/${data.login}/repos`);
  repoPromise
    .then(data => data.json())
    .then(data => { setReposFromApi(horizontal, vertical, data)})
    .catch((error) => {
      console.log(error);
    });
}

function drawMiscUserInfo(horizontal, vertical, data) { // Draw the other information about the github user.
  drawUserInfoNodes(data.login);
  drawUserInfoNodes(data.id);
  drawUserInfoNodes(data.following);
  drawUserInfoNodes(data.followers);
  function drawUserInfoNodes(info) {
    const div = document.createElement('div'); // Create a new node for each piece of user information.
    div.className = 'node userInfoNode';
    div.textContent = info;
    div.style.left = `${horizontal-170}px`;
    div.style.top = `${vertical-50}px`;
    const canvas = document.getElementById('treeCanvas');
    canvas.insertAdjacentElement('afterend', div);
    if (canvas.getContext) {
      let drawLine = canvas.getContext('2d');
      drawLine.beginPath();
      drawLine.lineWidth = 1.3;
      drawLine.moveTo(horizontal-50, vertical-40);
      drawLine.lineTo(horizontal-125, vertical-78);
      drawLine.closePath();
      drawLine.strokeStyle = 'red';
      drawLine.stroke();
      horizontal = horizontal - 170;
      vertical = vertical - 50;
    }
  }
}

function setReposFromApi(horizontal, vertical, data) { // Draw the repo information and lines.
  const repos = data;
  for (let index = 0; index <= 15; index++) {
    if (index === 0) {
      vetical = vertical + 200;
    } else {
      vertical = vertical - 50;
    }
    drawRepoNodes(horizontal, vertical, repos[index].name);
    drawMiscRepoData(horizontal, vertical, repos[index].language);
    drawMiscRepoData(horizontal+180, vertical, repos[index].size, true);
  }
}

function drawRepoNodes(horizontal, vertical, repo) {
  const div = document.createElement('div');
  div.className = 'node';
  div.textContent = repo;
  div.style.left = `${horizontal}px`;
  div.style.top = `${vertical-50}px`;
  const canvas = document.getElementById('treeCanvas');
  canvas.insertAdjacentElement('afterend', div);
  if (canvas.getContext) { // Draw lines on top of nodes
    let drawLine = canvas.getContext('2d');
    drawLine.beginPath();
    drawLine.lineWidth = 1.3;
    drawLine.moveTo(horizontal+25, vertical-58);
    drawLine.lineTo(horizontal+25, vertical-88);
    drawLine.closePath();
    drawLine.strokeStyle = '#2E8E99';
    drawLine.stroke();
  }
  drawRepoSide(horizontal, vertical);
}

function drawRepoSide(horizontal, vertical) {
  const canvas = document.getElementById('treeCanvas');
  if (canvas.getContext) { // Draw the line to the sides.
    let drawLine = canvas.getContext('2d'); 
    drawLine.beginPath();
    drawLine.lineWidth = 1.3;
    drawLine.moveTo(horizontal+100, vertical-90);
    drawLine.lineTo(horizontal+130, vertical-90);
    drawLine.closePath();
    drawLine.strokeStyle = '#2E8E99';
    drawLine.stroke();
  }
}

function drawMiscRepoData(horizontal, vertical, repo, size = false) { // Draw the nodes for the language data.
  const div = document.createElement('div');
  if (size) {
    div.className = 'node size';
  } else {
    div.className = 'node language';
  }
  if (size) {
    div.textContent = repo + ' Bytes';
  } else {
    div.textContent = repo;
  }
  div.style.left = `${horizontal+180}px`;
  div.style.top = `${vertical-50}px`;
  const canvas = document.getElementById('treeCanvas');
  canvas.insertAdjacentElement('afterend', div);
  horizontal = horizontal + 180;
  if (!size) {
    drawRepoSide(horizontal, vertical);
  }
}