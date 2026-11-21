# Kleiner lokaler Testserver für die Website (nur zum Ausprobieren, nicht zum Hosten):
#   pwsh website\serve.ps1                       dient dist\website auf http://localhost:8080/
# Dazu vorher:  pwsh installer\build-installer.ps1 -Website -BaseUrl http://localhost:8080/download
param(
    [string]$Root = (Join-Path $PSScriptRoot '..\dist\website'),
    [int]$Port = 8080
)

$Root = (Resolve-Path $Root).Path
$types = @{ '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.ico' = 'image/x-icon'
            '.json' = 'application/json'; '.zip' = 'application/zip'; '.exe' = 'application/octet-stream' }
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Website: http://localhost:$Port/   (Strg+C beendet)"
try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
        if ($rel -eq '') { $rel = 'index.html' }
        $file = [System.IO.Path]::GetFullPath((Join-Path $Root $rel))
        if ($file.StartsWith($Root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path $file -PathType Leaf)) {
            $ctx.Response.ContentType = $types[[System.IO.Path]::GetExtension($file).ToLowerInvariant()] ?? 'application/octet-stream'
            $ctx.Response.ContentLength64 = (Get-Item $file).Length
            $stream = [System.IO.File]::OpenRead($file)
            try { $stream.CopyTo($ctx.Response.OutputStream) } finally { $stream.Dispose() }
        } else { $ctx.Response.StatusCode = 404 }
        $ctx.Response.Close()
    }
} finally { $listener.Stop() }
