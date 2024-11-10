import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TabType, Item } from "./types"

interface AddEditModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
  isEditing: boolean
  activeTab: TabType
  renderForm: () => React.ReactNode
  handleAction: (action: "add" | "update", item?: Item) => Promise<void>
}

export const AddEditModal: React.FC<AddEditModalProps> = React.memo(
  ({
    showModal,
    setShowModal,
    isEditing,
    activeTab,
    renderForm,
    handleAction,
  }) => {
    return (
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#31363F] p-6 rounded-xl w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">
                {isEditing ? `Update ${activeTab}` : `Add ${activeTab}`}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAction(isEditing ? "update" : "add")
                }}
              >
                {renderForm()}
                <div className="flex justify-end space-x-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-[#76ABAE]/30 rounded-lg hover:bg-[#222831]"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded-lg hover:bg-[#76ABAE]/80"
                  >
                    {isEditing ? "Update" : "Add"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

AddEditModal.displayName = "AddEditModal"