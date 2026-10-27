Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('C:\Rubel\3d-frontend\src\assets\welcome\audition_banner.png')
Write-Host "Width: $($img.Width), Height: $($img.Height)"

for ($y = 0; $y -lt 150; $y += 5) {
    $c = $img.GetPixel(556, $y)
    Write-Host "Y=$($y) R=$($c.R) G=$($c.G) B=$($c.B)"
}

$img.Dispose()
