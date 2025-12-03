param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$SourcePath,
  [int]$Size = 800
)

# Usage:
# PowerShell: .\scripts\add-profile.ps1 -SourcePath "C:\Users\hp\OneDrive\Desktop\New folder\1750911740638.jpeg" -Size 800

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$PublicPath = Join-Path $ProjectRoot "public"
$DestPath = Join-Path $PublicPath "profile.jpg"

if (!(Test-Path $SourcePath)) {
  Write-Error "Source file not found: $SourcePath"
  exit 1
}

if (!(Test-Path $PublicPath)) {
  New-Item -ItemType Directory -Path $PublicPath | Out-Null
}

# Try to use ImageMagick (magick) if installed to resize; otherwise fallback to simple copy
$MagickPath = Get-Command magick -ErrorAction SilentlyContinue
if ($MagickPath) {
  Write-Output "Using ImageMagick to resize and copy the file to $DestPath"
  magick convert "$SourcePath" -resize ${Size}x${Size}^ -gravity center -extent ${Size}x${Size} "$DestPath"
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "ImageMagick returned non-zero exit code; attempting a direct copy instead"
    Copy-Item -Path $SourcePath -Destination $DestPath -Force
  }
} else {
  Write-Output "ImageMagick (magick) not found; copying file without resizing. For resizing, install ImageMagick or use a GUI tool."
  Copy-Item -Path $SourcePath -Destination $DestPath -Force
}

Write-Output "Profile image placed at: $DestPath"

# Show resulting file info
Get-Item $DestPath | Select-Object Name, @{n='SizeKB';e={[math]::round($_.Length/1KB,2)}}, LastWriteTime | Format-List
