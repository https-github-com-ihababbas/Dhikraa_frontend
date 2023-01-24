import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import style from '../styles/modal.module.css'
import Image from 'next/image'
import { Icon } from '@iconify/react';
// import styles from 'app/styles/styles.module.css';

export default function Example({ isopen, close, adkar, img, page }) {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)
  const [numPageState, SetNumPageState] = useState(page)


  const nextPage = () => {
    SetNumPageState(numPageState + 1)
  }

  const pravPage = () => {
    SetNumPageState(numPageState - 1)
  }



  return (
    <>

      <Transition.Root show={isopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`} />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-[#e5f2c4]  items-center px-4 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="hover:bg-[#949e7b] mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm focus:outline-none  focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto "
                      onClick={close}
                      ref={cancelButtonRef}
                    >
                      ❌
                    </button>
                  </div>

                  <div className="bg-[#e5f2c4] px-4 pt--5 pb-4 sm:px-6 sm:pb-4 h-full">
                    <div className="sm:flex sm:items-start">

                      <div className="text-center  sm:mt-0 sm:text-left">
                        <h1 className='mb-6 text-center text-4xl text-[#252f0b]'>
                          {adkar.titel}
                        </h1>

                        <div className="w-full mt-2 border-black border-5xl">
                          <div className='flex justify-center'>
                          <Image className='rounded-md w-96' src={img} alt='' />
                          </div>
                          <section className='flex mt-10 justift-between '>
                            {numPageState > 1 && <button
                              type="button"
                              className={`w-8 h-24 bg-[#3a451c] rounded-md text-white text-3xl m-4`}
                              onClick={pravPage}
                            >
                              <Icon icon="material-symbols:arrow-back-rounded" />
                            </button>}
                            <section>
                              {adkar[numPageState][0] != '' && <p className={style.first_p}>
                                {adkar[numPageState][0]}
                              </p>}
                              <p className={`${style.sec_p}`}>
                                {adkar[numPageState][1]}
                              </p>
                              <p className={`border-t-2 border-[#3a451c] ${style.third_p}`}>
                                {adkar[numPageState][2]}
                              </p>
                            </section>
                            {numPageState < 11 && <button
                              type="button"
                              className={`w-8 h-24 bg-[#3a451c] rounded-md text-white text-3xl m-4`}
                              onClick={nextPage}
                            >
                              <Icon icon="material-symbols:arrow-forward-rounded" />

                            </button>}
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  )
}