import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TabType, Item } from "./types"

interface DeleteModalProps {
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  deleteId: string
  setDeleteId: (id: string) => void
  activeTab: TabType
  handleAction: (action: "delete", item?: Item) => Promise<void>
}

export const DeleteModal: React.FC<DeleteModalProps> = React.memo(
  ({
    showDeleteModal,
    setShowDeleteModal,
    deleteId,
    setDeleteId,
    activeTab,
    handleAction,
  }) => {
    return (
      <AnimatePresence>
        {showDeleteModal && (
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
              <h3 className="text-xl font-bold mb-4">Delete {activeTab}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAction("delete")
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="deleteId"
                    className="block text-sm font-medium text-[#EEEEEE] mb-1"
                  >
                    ID to Delete
                  </label>
                  <input
                    type="text"
                    id="deleteId"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#222831] border border-[#76ABAE]/30 text-[#EEEEEE] focus:outline-none focus:border-[#76ABAE]"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-[#76ABAE]/30 rounded-lg hover:bg-[#222831]"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
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

DeleteModal.displayName = "DeleteModal"