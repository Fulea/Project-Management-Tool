document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueId = chance.guid();
  var issueSprintId = chance.guid();
  var issueStatus = 'New';
  var issueName = document.getElementById('issueNameInput').value;
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueComment = document.getElementById('issueCommentInput').value;
  var issueTask = document.getElementById('issueTaskInput').value;
  var issueType = document.getElementById('issueTypeInput').value;
  var issueCreatedBy = document.getElementById('issueCreatedByInput').value;
  var issueCreatedAt = new Date();

  var issue = {
    id: issueId,
    sprintId: issueSprintId,
    status: issueStatus,
    name: issueName,
    description: issueDesc,
    comment: issueComment,
    task: issueTask,
    type: issueType,
    createdBy: issueCreatedBy,
    createdAt: issueCreatedAt
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }


  document.getElementById('issueInputForm').reset();

  getIssues();

  e.preventDefault();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  getIssues();
}

function getIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var type = issues[i].type;
    var name = issues[i].name;
    var desc = issues[i].description;
    var createdBy = issues[i].createdBy;
    var status = issues[i].status;
    var sprintId = issues[i].sprintId;
    var task = issues[i].task;
    var comment = issues[i].comment;
    var createdAt = issues[i].createdAt;

    issuesList.innerHTML +=   '<div class="well">'+
                              // '<h6>Issue ID: ' + id + '</h6>'+
                              // '<h6>Issue ID: ' + sprintId + '</h6>'+
                              '<div class="input-group-btn">'+
                                '<button id="statusBtn" onclick="updateStatus(this)" type="button" class="btn btn-status dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="statusLabel" class="label label-info">' + status + '</span><span class="caret"></span></button>' +
                                    '<ul id="dropdownValue" class="dropdown-menu">' +
                                      '<li><a id="New" onclick="getStatusValue(this.id)" href="#">New</a></li>' +
                                      '<li><a id="Progress" onclick="getStatusValue(this.id)" href="#">In progress</a></li>' +
                                      '<li><a id="Feedback" onclick="getStatusValue(this.id)" href="#">Feedback</a></li>' +
                                      '<li><a id="Rework" onclick="getStatusValue(this.id)" href="#">Rework</a></li>' +
                                      '<li><a id="Resolved" onclick="getStatusValue(this.id)" href="#">Resolved</a></li>' +
                                      '<li><a id="Testing" onclick="getStatusValue(this.id)" href="#">Ready for Testing</a></li>' +
                                  '</ul>' +
                              '</div>' +
                              '<h4> Name ' + name + '</h4>'+
                              '<h5>' + desc + '</h5>'+
                              '<h6>' + comment + '</h4>'+
                              '<h6>' + task + '</h6>'+
                              '<p><span class="glyphicon glyphicon-th-list"></span> ' + type + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + createdBy + '</p>'+
                              '<h6><span class="glyphicon glyphicon-time"></span> ' + createdAt + '</h6>'+
                              '<div class="btn-toolbar text-center" role="toolbar" aria-label="...">' +
                                '<div onclick="editIssue(\''+id+'\')" class="btn-group btn-group-lg glyphicon glyphicon-pencil pr-4" role="group"></div>' +
                                '<div onclick="updateIssue(\''+id+'\')" class="btn-group btn-group-lg glyphicon glyphicon-floppy-saved pr-4" role="group"></div>' +
                                '<div onclick="deleteIssue(\''+id+'\')" class="btn-group btn-group-lg glyphicon glyphicon-trash" role="group"></div>' +
                              '</div>' +
                              '</div>';
  }

  console.log('issue type', issues[1].type)
}

function getStatusValue (id) {
  var newStatus = id
  document.getElementById('statusLabel').innerHTML = id;

}

function updateStatus () {
  for (var i = 0; i < this.statusLabel.length; i++) {
    console.log(this.statusLabel[i])  
  }
  this.getStatusValue()
}
//
// function getStatusValue (id) {
//   event.preventDefault;
//   var newStatus = id
//   document.getElementById('statusLabel').innerHTML = id;
// }
