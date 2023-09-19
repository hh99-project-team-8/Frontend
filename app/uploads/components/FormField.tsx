type FormFieldProps = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea: boolean;
  setState: (value: string) => void;
};

const FormField: React.FC<FormFieldProps> = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}) => {
  return (
    <div className="flex flex-col items-center justify-center  w-full gap-4 max-w-[1080px]">
      <label className="w-full text-neutral-800 font-semibold text-start pl-2 text-lg">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className="w-full outline-0 bg-neutral-100 rounded-xl p-4 h-[168px] resize-none overflow-scroll"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required
          className="w-full bg-neutral-100 rounded-xl p-4"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
