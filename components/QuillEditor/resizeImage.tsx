import Resizer from "react-image-file-resizer";

export default function resizeFile(file: Blob) {
    return new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            800,
            800,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });
}

