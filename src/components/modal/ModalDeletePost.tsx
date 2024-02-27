export default function ModalDeletePost({
  openModal,
  setOpenModal,
  handleDelete,
}: {
  openModal: boolean;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
  handleDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}) {
  return (
    <>
      <div
        id="modal-delete"
        className="group relative z-50 aria-[modal=true]:block aria-[modal=false]:hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={openModal}
      >
        {/*Background backdrop, show/hide based on modal state.*/}
        <div className="fixed inset-0 bg-gray-700 bg-opacity-80 backdrop-blur-sm group-aria-[modal=true]:opacity-100 group-aria-[modal=false]:opacity-0 transition-all"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            id="modal-out"
            className="flex min-h-full items-end justify-center p-0 text-center sm:items-center md:p-4"
          >
            <div
              id="modal-within"
              className="flex-1 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl md:my-8 w-full h-screen group-aria-[modal=true]:opacity:100 group-aria-[modal=false]:opacity-0 group-aria-[modal=true]:translate-y-0 md:group-aria-[modal=false]:translate-y-4 group-aria-[modal=false]:translate-y-0 group-aria-[modal=false]:scale-95 group-aria-[modal=true]:scale-100 md:max-w-2xl md:h-4/5 transition-all"
            >
              <div className="bg-gray-100 px-4 py-3 flex justify-between sm:px-6">
                <div className="flex items-center sm:justify-around sm:gap-1">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                    <i className="fa-solid fa-trash text-2x" />
                  </div>
                  <div className="text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Delete post
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  id="btn-close-modal"
                >
                  <i className="fa-regular fa-circle-xmark text-gray-400 text-xl" />
                </button>
              </div>
              <div className="bg-white pb-4 px-6 pt-0 flex flex-col items-center mt-2 md:px-6 md:py-12">
                <div className="text-lg">
                  Are you sure you want to delete this post?
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  id="btn-add"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  id="btn-cancel"
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
