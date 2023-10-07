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
      className={`bg-white rounded-3xl  h-64 w-1/4 absolute mx-auto my-auto inset-0 flex flex-col items-center justify-center z-50 text-black ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-opacity duration-300 ease-in-out`}
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className='border'{...register("title")} placeholder="Title" />
            <p>
                <input className='border' {...register("authors")} placeholder="Authors" />
            </p>
            <p>
                <input className='border' {...register("source")} placeholder="Source" />
            </p>
            <p>
                <input className='border' {...register("pubyear")} placeholder="Publication Year" />
            </p>
            <p>
                <input className='border' {...register("doi")} placeholder="DOI" />
            </p>
            <select {...register("linked_discussion")}>
                <option value="">Select SE practice...</option>
                <option value="TDD">TDD</option>
                <option value="Mob Programming">Mob Programmin</option>
            </select>
            <input type="submit" />
        </form>
    <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Close </button>
    </div>
  );
};

export default Popup;