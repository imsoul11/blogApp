import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import Loaderv from './Loaderv';

export default function RTE({ name, control, label, defaultvalue }) {
    const [editor, setEditor] = useState(false);

    const render = () => {
        setEditor(
            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='8ylugkavhs74c4d2w8te0uf6b42qop0jrbqvrwdi4nksggep'
                        initialValue={defaultvalue}
                        init={{
                            initialValue: defaultvalue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'image',
                                'advlist',
                                'autolink',
                                'lists',
                                'link',
                                'image',
                                'charmap',
                                'preview',
                                'anchor',
                                'searchreplace',
                                'visualblocks',
                                'code',
                                'fullscreen',
                                'insertdatetime',
                                'media',
                                'table',
                                'code',
                                'help',
                                'wordcount',
                                'anchor',
                            ],
                            toolbar:
                                'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={onChange}
                        
                    />
                )}
            />
        );
    };

    useEffect(() => {
        render();
    }, []);

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            {editor ? editor : <><div className='text-center ml-6  '>loading Editor, Please wait. </div><Loaderv/></>}
        </div>
    );
}
