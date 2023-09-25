'use client';

import Image from 'next/image';
import { ChangeEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '../components/Editor';
import '../../../app/styles.css';

import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

type CreateFormProps = {};

const Update = ({ value }) => {
  const [editor2] = useLexicalComposerContext();

  useEffect(() => {
    if (value) {
      editor2.setEditorState(value);
    }
  }, [editor2, value]);

  return null;
};

const CreateForm: React.FC<CreateFormProps> = () => {
  const [editorText, setEditorText] = useState<string>(''); // 상태 추가
  const [title, setTitle] = useState('What have you been working on?'); // 상태 추가
  const [imgFile, setImgFile] = useState();
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const imgRef = useRef();
  const router = useRouter();
  const [editorState, setEditorState] = useState();
  const [gitUrl, setGitUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {};

  // 이미지 업로드 input의 onChange

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = imgRef.current?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {};

  const handleCategory = (e: any) => {
    setCategory(e.target.textContent);
  };

  const form = {
    image: imgFile,
    title,
    editorState,
    category,
    gitUrl,
    projectUrl,
  };

  const showEditor = (e: any) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeEditor = () => {
    setIsOpen(false);
  };

  const onChange = (editorState: any) => {
    editorState.read(() => {
      const editorStateWithoutSelection = editorState.clone(null);
      setEditorState(editorStateWithoutSelection);
    });
  };

  console.log(form);

  return (
    <div
      style={{
        width: `${!form.image || !isOpen ? '100%' : '82%'}`,
        transition: '500ms ease-in-out 0s',
      }}
      onClick={closeEditor}
    >
      <div
        style={{
          zIndex: '50 ',
          width: '80%',
          height: '835px',
          margin: 'auto',
          position: 'relative',
        }}
      >
        <form
          style={{
            width: 'calc(100vh-300px)',
          }}
        >
          <input
            value={title}
            onChange={(e) => handleTitle(e)}
            className='flex text-[31px] font-bold w-full text-center justify-center py-5'
          ></input>
          <div
            onClick={(e) => {
              e.stopPropagation();
              closeEditor;
            }}
            style={{
              height: `${!form.image || !isOpen ? '100%' : '250px'}`,
              transition: '500ms ease-in-out 0s',
            }}
            className='flex items-center justify-center w-full lg:min-h-[400px] min-h-[200px] relative max-w-[1080px] mx-auto my-6'
          >
            <label
              htmlFor='image'
              style={{ border: !form.image || 'none' }}
              className='flex justify-center items-center z-10 text-center w-full h-full p-20 text-neutral-700 border-2 border-gray-200 border-dashed mx-4 rounded-xl lg:min-h-[600px] min-h-[200px]'
            >
              {!form.image && (
                <div className='flex flex-col justify-center items-center'>
                  <Image
                    src='/img_placeholder.png'
                    width='95'
                    height='95'
                    alt='image placeholder'
                    className='mb-4'
                  />
                  <p>Choose a image, or Browse</p>
                  <p className='mt-2 text-sm text-neutral-500'>
                    Minimum 1600px width recommended. Max 10MB each.
                  </p>
                </div>
              )}
            </label>
            <input
              id='image'
              type='file'
              accept='image/*'
              required
              className='absolute z-30 w-full opacity-0 h-full cursor-pointer p-0 '
              onChange={handleChangeImage}
              ref={imgRef}
              style={{
                width: `${!form.image || !isOpen ? '100%' : '450px'}`,
                height: '350px',
                transition: '500ms ease-in-out 0s',
              }}
            />
            {form.image && (
              <Image
                src={form?.image}
                className='sm:p-10 object-contain z-20 hover:opacity-80 p-0'
                alt='image'
                fill
              />
            )}
          </div>
        </form>
        <div
          style={{
            width: '80%',
            margin: 'auto',
          }}
          onClick={(e) => {
            showEditor(e);
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50px',
              flexDirection: 'column',
              maxHeight: '500px',
              margin: 'auto',
              zIndex: '50',
              borderRadius: '10px',
            }}
            className='hover:border-2 border-solid border-#2525df'
          >
            <div
              style={{ width: '650px', margin: 'auto' }}
              onClick={showEditor}
            >
              <LexicalComposer
                initialConfig={{
                  onError(error) {
                    throw error;
                  },
                  editable: false,
                  nodes: [],
                }}
              >
                <Update value={editorState} />
                <PlainTextPlugin
                  placeholder={null}
                  contentEditable={<ContentEditable />}
                  ErrorBoundary={null}
                />
              </LexicalComposer>
            </div>
          </div>
        </div>
        <div>
          <div
            onClick={(e) => {
              showEditor(e);
            }}
            style={{
              marginTop: '50px',
              opacity: `${!form.image || !isOpen ? '0%' : '100%'}`,
              height: `${!form.image || !isOpen ? '0px' : '70px'}`,
              position: 'absolute',
              width: '100%',
              left: '0',
              bottom: '10%',
              alignItems: 'center',
              justifyContent: 'center',
              transition: '500ms ease-in-out 0s',
            }}
          >
            <Editor onChange={onChange} />
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          top: '0',
          right: '0',
          opacity: `${!form.image || !isOpen ? '0%' : '100%'}`,
          width: `${!form.image || !isOpen ? '0px' : '300px'}`,
          height: '100%',
          backgroundColor: 'white',
          transition: '500ms ease-in-out 0s',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button onClick={closeEditor} style={{ height: '50px' }}>
          Close
        </button>

        <div className='mt-2 w-full h-96'>
          <h1>Url</h1>
          <div className='mt-8 text-xs mb-4'>
            Please enter URLs that describe the project.
          </div>
          <h5 className='mt-4 mb-2'>gituhb</h5>
          <input
            value={gitUrl}
            onChange={(e) => {
              setGitUrl(e.target.value);
            }}
            style={{
              borderColor: 'rgb(231, 231, 233)',
              height: '36px',
              borderRadius: '10px',
              border: '1px',
              fontSize: '13px',
            }}
            className='w-full '
          ></input>
          <h5>project's</h5>
          <input
            value={projectUrl}
            onChange={(e) => {
              setProjectUrl(e.target.value);
            }}
            style={{
              borderColor: 'rgb(231, 231, 233)',
              height: '36px',
              borderRadius: '10px',
              border: '1px',
              fontSize: '13px',
            }}
            className='w-full '
          ></input>
          <div className='mt-4'>
            <h1>Category</h1>
            <div className='mt-8 text-xs mb-4'>
              Why don't you choose a category here?
            </div>
            <div className='flex justify-center flex-col m-auto items-center'>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 shadow border-gray-200 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Discover
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 shadow border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Animation
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 shadow border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Branding
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 shadow border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Illustration
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 shadow border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Mobile
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 shadow border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Print
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 border-2 border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Product Design
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 border-2 border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Typograhy
              </button>
              <button
                onClick={(e) => {
                  handleCategory(e);
                }}
                className='w-4/5 h-8 border-2 border-gray-100 bg-white rounded-md mb-4 hover:bg-slate-200 active:bg-slate-400 focus:bg-slate-200 focus:outline-none focus:border-none'
              >
                Web Design
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;