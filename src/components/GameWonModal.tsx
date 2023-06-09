import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type GameWonModalProps = {
  visible: boolean;
  onRestart: () => void;
};

export const GameWonModal = ({ visible, onRestart }: GameWonModalProps) => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onRestart}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Congratulations!
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You won the game! Keep going to try and beat your high score.
                </p>
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                  onClick={onRestart}
                >
                  Restart Game
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
