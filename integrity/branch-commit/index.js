const fs = require('fs');
const exec = require('child_process').execSync;
const core = require('@actions/core');
const github = require('@actions/github');


try {
  // `who-to-greet` input defined in action metadata file
  const branchName = core.getInput('branch-name');
  console.log(`Branch to commit ${branchName}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log(`The current directory ${process.cwd()}`);
  let contents = JSON.stringify(fs.readdirSync(process.cwd()));
  console.log(`Current directory contents ${contents}`);
  console.log(`The repo: ${github.context.repo}`);
  console.log(`The workflow: ${github.context.workflow}`);
  // console.log(`The event payload: ${payload}`);
  exec("git config --global user.email 'user@example.com' && git config --global user.name 'Divanix Action'");
  exec('git fetch');
  exec(`git checkout ${branchName}`);
  exec("echo 'hello' >> branch-commit.md");
  exec("git add *");
  exec(`git commit -a -m 'divanix commit to ${branchName}'`);
  exec('git push');

} catch (error) {
  core.setFailed(error.message);
}