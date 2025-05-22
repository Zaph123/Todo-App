import { motion } from "framer-motion";
import { FormButtonProps, ActionMenuItemProps, TodoActionsDropdownProps } from "../../config/propTypes";
import { FaEllipsis } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const FormButton = ({ icon, label, onClick, variant, disabled }: FormButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    className={`${
      variant === "submit" 
        ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
        : "border text-red-400 hover:text-red-500"
    } transition-colors disabled:opacity-50 disabled:cursor-not-allowed duration-300 py-2 px-4 rounded-full flex items-center justify-center gap-2`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </motion.button>
);

const TodoActionsDropdown = ({ onDelete, onEdit, onMarkAsDone }: TodoActionsDropdownProps) => (
    <Menu>
      <MenuButton className="p-2 rounded-full hover:bg-gray-100">
        <FaEllipsis className="size-5" />
      </MenuButton>
      <MenuItems 
        anchor="bottom" 
        className="bg-white text-sm font-poppins w-40 rounded-lg shadow-md focus:outline-none z-50"
      >
        <ActionMenuItem onClick={onEdit}>Edit</ActionMenuItem>
        <ActionMenuItem onClick={onMarkAsDone}>Mark as Done</ActionMenuItem>
        <ActionMenuItem onClick={onDelete} className="text-red-600">
          Delete
        </ActionMenuItem>
      </MenuItems>
    </Menu>
  );
  
  
  const ActionMenuItem = ({ children, onClick, className = "" }: ActionMenuItemProps) => (
    <MenuItem>
      <button 
        onClick={onClick} 
        className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none ${className}`}
      >
        {children}
      </button>
    </MenuItem>
  );

export { FormButton, TodoActionsDropdown, ActionMenuItem };