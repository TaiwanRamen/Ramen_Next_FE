import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useMemo, useRef, useState} from "react";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import usePost from "../../customHooks/usePost";
import resizeFile from "./resizeImage";
import LoadingIcon from "../Loading/LoadingIcon";
import {Box, Dialog, DialogContent, DialogContentText} from "@material-ui/core";

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false
    }
);


const useStyles = makeStyles(() => ({
    quillEditor: {
        "& > div.ql-container": {
            backgroundColor: "white",
            height: "50vh",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        },
        "& > div.ql-container > div.ql-editor": {
            fontSize: "1rem",
        },
    }
}))

type Props = {
    storageKey: string,
    defaultContent?: string
}

const QuillEditor = (props: Props) => {
    const classes = useStyles();
    const storageKey = props.storageKey;
    const showSnackBar = useStackedSnackBar();
    const {mutateAsync} = usePost();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const defaultContent = props.defaultContent ? props.defaultContent : window.localStorage.getItem(storageKey);
    const quillRef = useRef<any>();

    useEffect(() => {
        const check = () => {
            if (quillRef.current) {
                return;
            }
            setTimeout(check, 200);
        };
        check();
    }, [quillRef]);

    const uploadImage = async (result: any) => {
        try {
            const formData = new FormData();
            formData.append('upload_image', result);

            const reqProps = {
                url: process.env.NEXT_PUBLIC_BE_URL + "/api/v1/reviews/image",
                requestBody: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await mutateAsync(reqProps);
            if (response.status === 200) {
                const data = response.data?.data;
                showSnackBar(`上傳照片成功`, 'success');
                return data.imageUrl;
            } else {
                return new Error()
            }
        } catch (error) {
            console.log(error)
            showSnackBar(`上傳圖片失敗`, 'error');
        }
    }

    const imageHandler = async () => {
        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection();

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            if (!input?.files?.[0]) {
                return showSnackBar(`不是正確的圖片`, 'error');
            }
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                try {
                    setIsUploading(true);
                    const image = await resizeFile(file);
                    let imageUrl = await uploadImage(image);
                    // Insert the server saved image
                    editor?.insertEmbed(range.index, 'image', imageUrl, "user");
                    editor?.setSelection(range.index + 1, "API")
                } catch (e) {
                    console.log(e)
                    return showSnackBar(`上傳圖片出現問題`, 'error');
                } finally {
                    setIsUploading(false)
                }

            } else {
                showSnackBar(`僅能上傳圖片檔案`, 'error');
            }
        };
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{'header': [1, 2, 3, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{list: 'ordered'}, {list: 'bullet'}],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: {
                image: imageHandler
            },
        },
    }), []);

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];


    const onQuillChange = (content: any) => {
        window.localStorage.setItem(storageKey, content);
    }

    return (
        <Box>
            <Dialog open={isUploading}>
                <DialogContent>
                    <DialogContentText id="uploading">
                        上傳圖片中，請稍等
                        <LoadingIcon/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <ReactQuill
                forwardedRef={quillRef}
                theme="snow"
                defaultValue={defaultContent ? defaultContent : ""}
                modules={modules}
                formats={formats}
                onChange={onQuillChange}
                placeholder=""
                className={classes.quillEditor}
            />
        </Box>

    )
};

export default QuillEditor