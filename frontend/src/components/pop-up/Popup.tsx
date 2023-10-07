import React from 'react';
import { useForm } from "react-hook-form";


interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => JSON.stringify(data);

  return (
    <div
      className={`bg-white rounded-3xl border-4 border-blue-500 h-fit w-1/4 absolute mx-auto my-auto inset-0 flex flex-col items-center justify-center z-50 text-black sm:w-64 md:w-80 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-opacity duration-300 ease-in-out`}
    >
        <h1 className="text-xl my-1">Edit Submission</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className='border border-black mt-2  '{...register("title")} placeholder="Title" />
            <p>
                <input className='border border-black mt-2  ' {...register("authors")} placeholder="Authors" />
            </p>
            <p>
                <input className='border border-black mt-2  ' {...register("source")} placeholder="Source" />
            </p>
            <p>
                <input className='border border-black mt-2  ' {...register("pubyear")} placeholder="Publication Year" />
            </p>
            <p>
                <input className='border border-black mt-2  ' {...register("doi")} placeholder="DOI" />
            </p>
            <select className='border border-black mt-2  ' {...register("linked_discussion")}>
                <option value="">Select SE practice...</option>
                <option value="TDD">TDD</option>
                <option value="Mob Programming">Mob Programmin</option>
            </select>
            <button className="bg-blue-500" type="submit">
              Submit
            </button>
        </form>
    <button onClick={onClose} className="my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Close </button>
    </div>
  );
};

export default Popup;