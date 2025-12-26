import JSZip from "jszip"
import { GeneratedFile, ScaffoldManifest } from "@/lib/types"

export async function generateZip(files: GeneratedFile[], manifest: ScaffoldManifest): Promise<Blob> {
    const zip = new JSZip()

    // Add each file to the zip
    for (const file of files) {
        zip.file(file.path, file.content)
    }

    // Generate the zip file
    const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    })

    return blob
}

export function downloadZip(blob: Blob, projectName: string): void {
    // Create download link
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${projectName}-scaffold.zip`

    // Trigger download
    document.body.appendChild(a)
    a.click()

    // Cleanup
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

export async function generateAndDownload(files: GeneratedFile[], manifest: ScaffoldManifest): Promise<void> {
    const blob = await generateZip(files, manifest)
    downloadZip(blob, manifest.name)
}
