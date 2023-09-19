"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

type CreateFormProps = {};

const CreateForm: React.FC<CreateFormProps> = () => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};
  const form = {
    image: "",
    title: "",
  };

  return (
    <form>
      <h3 className="flex text-[31px] font-bold w-full text-center justify-center py-5">
        What have you been working on?
      </h3>
      <div className="flex items-center justify-center w-full lg:min-h-[400px] min-h-[200px] relative max-w-[1080px] mx-auto my-6">
        <label
          htmlFor="poster"
          className="flex justify-center items-center z-10 text-center w-full h-full p-20 text-neutral-700 border-2 border-gray-200 border-dashed mx-4 rounded-xl lg:min-h-[600px] min-h-[200px]"
        >
          {!form.image && (
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/img_placeholder.png"
                width="95"
                height="95"
                alt="image placeholder"
                className="mb-4"
              />
              <p>Choose a image, or Browse</p>
              <p className="mt-2 text-sm text-neutral-500">
                Minimum 1600px width recommended. Max 10MB each.
              </p>
            </div>
          )}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required
          className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <div className="flex flex-col gap-10 justify-center items-center z-10 text-center w-full h-full text-neutral-700 mx-4 rounded-xl pt-4 mb-16"></div>
    </form>
  );
};

export default CreateForm;
