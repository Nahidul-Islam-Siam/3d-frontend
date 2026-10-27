Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile('C:\Rubel\3d-frontend\src\assets\welcome\showdown-poster.png')

$targetW = [int]$src.Width
$targetH = 1620

$bmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$rect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
$g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$src.Dispose()

$outPath = 'C:\Rubel\3d-frontend\src\assets\welcome\audition_banner.png'
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Created $outPath successfully with dimensions $targetW x $targetH"
