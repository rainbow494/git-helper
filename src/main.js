var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var cmdTemp = [
    'log',
    'fetch',
    'rebase'
];

var projectTemp = [];
var cmdSelected = [];
var projectSelected = [];

function init() {
    readProjectConfig();

    var $commandContainer = $('.command-list');
    cmdTemp.map(function (cmd) {
        $btn = $('<button id="'+ cmd +'" type="button" onclick="onCommandClick(\''+ cmd +'\')">' + cmd + '</button>');
        $commandContainer.append($btn);
    });

    var $projectContainer = $('.project-list ul');
    projectTemp.map(function (project, idx) {
        $item = $('<li id="' + idx + '" onclick="onSelectProject(\''+ idx +'\')">' +
            path.parse(project).name + ' - '+project + '</li>');
        $projectContainer.append($item);
    });
}

function readProjectConfig(){
    var configPathTmp = 'project.config';
    var data = '';

    var debug = false;
    if (debug) {
        configPath = configPathTmp;
    }
    else {
        var nwPath = process.execPath;
        var nwDir = path.dirname(nwPath);
        configPath = path.normalize(nwDir + '\\' + configPathTmp);
    }

    // try {
        data = fs.readFileSync(configPath, 'utf8');
        data.replace(/^\s+|\s+$/g,'').split('\r\n').map(function functionName(projectPath) {
            projectTemp.push(path.normalize(projectPath));
        });
    // } catch (e) {
    //     console.log(e);
    // }
}
function onSelectProject(projectKey) {
    var item = $('#' + projectKey);
    if (item.hasClass('selected'))
    item.removeClass('selected');
    else
    item.addClass('selected');

    var $projectList = $('.project-list .selected');
    projectSelected = [];
    $projectList.map(function (idx, project) {
        return projectSelected.push(projectTemp[project.id]);
    });
}

function onCommandClick(cmd) {
    // var btn = $('#' + cmd);
    // if (btn.hasClass('selected'))
    //     btn.removeClass('selected');
    // else
    //     btn.addClass('selected');
    //
    // cmdSelected = [];
    // var $cmdList = $('.command-list .selected');
    // $cmdList.map(function (idx, cmd) {
    //     return cmdSelected.push(cmd.id);
    // });
    cmdSelected = [cmd];
    console.log(cmdSelected);
    onRunClick();
}

function onRunClick() {
    $(".output-panel").value = '';

    projectSelected.map(function (project) {
        cmdSelected.map(function (cmd) {
            if (cmd === "fetch")
            fetch(project);
            else
            execTortoiseGitProc(cmd, project);
        });
    });
}

function fetch(projectPath){
    var command = 'git.exe fetch -v --progress "origin"';
    execCmd(command, projectPath);
}

function execTortoiseGitProc(command, projectPath){
    execCmd('tortoiseGitProc -command ' + command, projectPath);
}

function execCmd(command, projectPath){
    var execPath = path.relative(process.cwd(), projectPath);

    // solution need research, fetch cmd's output cannot be redirected!!!
    // var child = execSync(command, {cwd:execPath, encoding: 'utf-8', stdio:[0,1,2]});
    // console.log(child);

    var child = exec(command, {cwd:execPath});

    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
        document.getElementById("output-panel").value += data;

    });
    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });
}

init();
