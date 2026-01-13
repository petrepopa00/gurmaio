$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $repoRoot

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

git push
