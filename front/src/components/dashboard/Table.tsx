import React from "react";
import { motion } from "framer-motion";
import { Item } from "./types";

interface TableProps {
  data: Item[];

  setFormData: React.Dispatch<React.SetStateAction<Item>>;

  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;

  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;

  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
}

export const Table: React.FC<TableProps> = React.memo(
  ({ data, setFormData, setFormErrors, setIsEditing, setShowModal }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#31363F] rounded-xl overflow-hidden shadow-xl"
      >
        <table className="min-w-full divide-y divide-[#76ABAE]/20">
          <thead className="bg-[#222831]">
            <tr>
              {data[0] &&
                Object.keys(data[0]).map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-[#EEEEEE]/70 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-[#EEEEEE]/70 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#31363F] divide-y divide-[#76ABAE]/20">
            {data.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-[#222831] transition-colors"
              >
                {Object.entries(item).map(([key, value]) => (
                  <td
                    key={key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-[#EEEEEE]/80"
                  >
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFormData(item);
                      setFormErrors({});
                      setIsEditing(true);
                      setShowModal(true);
                    }}
                    className="text-[#76ABAE] hover:text-[#76ABAE]/80 mr-2"
                  >
                    Update
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  }
);

Table.displayName = "Table";
