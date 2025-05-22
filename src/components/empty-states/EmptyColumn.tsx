import { LuListTodo } from "react-icons/lu";

const EmptyColumn = () => (
    <div className="w-full bg-white gap-4 rounded-3xl min-h-[30vh] flex flex-col items-center justify-center">
        <div className="text-gray-500 text-5xl">
            <LuListTodo />
        </div>
        <p>No Tasks Added</p>
    </div>
);

export default EmptyColumn;