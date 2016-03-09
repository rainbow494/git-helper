var _debug_ = false;

var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var bashCmdTemp = [
'tortoiseGit_log',
'git_fetch',
'tortoiseGit_rebase',
'win_explorer',
];

var projectTemp = [];
var bashCmdSelected = [];
var projectSelected = [];

function init() {
	readProjectConfig();

	var $cmdContainer = $('.command-list');
	bashCmdTemp.map(function (bashCmd) {
		var cmd = parseBashCmd(bashCmd).cmd;
		$btn = $('<button id="'+ bashCmd +'" data-bash-cmd="' + bashCmd + '" type="button">' + cmd + '</button>');
		$btn.click(onCmdClick);
		$cmdContainer.append($btn);
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
	if (_debug_) {
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

function onCmdClick() {
    // var btn = $('#' + cmd);
    // if (btn.hasClass('selected'))
    //     btn.removeClass('selected');
    // else
    //     btn.addClass('selected');
    //
    // bashCmdSelected = [];
    // var $cmdList = $('.command-list .selected');
    // $cmdList.map(function (idx, cmd) {
    //     return bashCmdSelected.push(cmd.id);
    // });
    bashCmd = $(this).data('bash-cmd');
    bashCmdSelected = [bashCmd];
    //console.log(bashCmdSelected);
    onRunClick();
}

function onRunClick() {

	projectSelected.map(function (project) {
		bashCmdSelected.map(function (bashCmd) {
			var bashCmdEntity = parseBashCmd(bashCmd);
			var bash = bashCmdEntity.bash;
			var cmd = bashCmdEntity.cmd;
			switch(bash)
			{
				case ('win'):
				win(cmd, project);
				break;
				case ('git'):
				git(cmd, project);
				break;
				case ('tortoiseGit'):
				execTortoiseGitProc(cmd, project);
				break;
				default:
				break;
			}
		});
	});
}

function parseBashCmd(bashCmd){
	return {
		bash:bashCmd.split('_')[0],
		cmd:bashCmd.split('_')[1]
	}
}

function win(cmd, projectPath){
	cmd = cmd + " " + projectPath;
	execCmd(cmd, projectPath);
}

function git(cmd, projectPath){

	var $outputPanel = $("#output-panel");
	$outputPanel[0].value += "-----------git cmd output--------------\n";
	$outputPanel. scrollTop($outputPanel[0].scrollHeight);
	
	cmd = "git "+ cmd +" -v --progress origin";
	execCmd(cmd, projectPath);
}

function execTortoiseGitProc(cmd, projectPath){
	cmd = 'tortoiseGitProc -command ' + cmd;
	execCmd(cmd, projectPath);
}

function execCmd(cmd, projectPath){
	var execPath = path.relative(process.cwd(), projectPath);

    // solution need research, fetch cmd's output cannot be redirected!!!
    // var child = execSync(cmd, {cwd:execPath, encoding: 'utf-8', stdio:[0,1,2]});
    // console.log(child);
    
    var child = exec(cmd, {cwd:execPath});
    
    child.stdout.on('data', function(data) {
    	console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
    	console.log('stdout: ' + data);
    	$("#output-panel")[0].value += data;

    });
    child.on('close', function(code) {
    	console.log('closing code: ' + code);
    });
}

init();
