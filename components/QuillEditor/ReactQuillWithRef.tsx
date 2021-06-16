import React, {ForwardedRef} from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
    forwardedRef: ForwardedRef<any>,
    theme: string,
    defaultValue: string,
    modules: object,
    formats: string[],
    placeholder: string,
    onChange: (any) => void,
    className: string
}

const  ReactQuillWithRef = (props: Props) => {
    return <ReactQuill
        ref={props.forwardedRef}
        theme={props.theme}
        defaultValue={props.defaultValue}
        modules={props.modules}
        formats={props.formats}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props.className}
    />
}
export default ReactQuillWithRef

