$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $repoRoot

function Invoke-GitPullRebase {
  $hasRemote = (git remote 2>$null) | Select-Object -First 1
  if (-not $hasRemote) {
    Write-Output 'No git remote configured; skipping pull/rebase.'
    return
  }

  $upstream = git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>$null
  if ($LASTEXITCODE -ne 0 -or -not $upstream) {
    Write-Output 'No upstream set for current branch; skipping pull/rebase.'
    return
  }

  Write-Output "Rebasing onto $upstream..."
  git pull --rebase --autostash
  if ($LASTEXITCODE -ne 0) {
    Write-Output 'Rebase with --autostash failed; retrying without autostash...'
    git pull --rebase
  }
}

Invoke-GitPullRebase

git add -A

git diff --cached --quiet

if ($LASTEXITCODE -eq 0) {
  Write-Output 'No staged changes to commit.'
  exit 0
}

$msg = "chore: auto commit $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

git commit -m "$msg"

if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

$upstream = git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>$null
if ($LASTEXITCODE -eq 0 -and $upstream) {
  git push
} else {
  $branch = git rev-parse --abbrev-ref HEAD
  if ($LASTEXITCODE -ne 0 -or -not $branch) {
    Write-Output 'Could not determine current branch. Run git push manually.'
    exit 1
  }

  Write-Output "No upstream set; pushing with -u origin $branch"
  git push -u origin $branch
}
