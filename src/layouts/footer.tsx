export default function Footer() {
  return (
    <>
      <div className="header-font flex h-[50px] w-full items-center justify-center gap-5 bg-[#f4f4f4] px-20 dark:bg-[#242224]">
        <div className="flex w-[70%] justify-around">
          <div className="flex-2">
            <p className="text-sm text-gray-400">NeterAlex © 2023 </p>
          </div>
          <div className="flex flex-1 justify-center">
            <p className="text-sm text-gray-400">黑ICP备2023004156号-1</p>
          </div>
          <div className="flex-2">
            <p className="text-sm text-gray-400">Powered by Riku</p>
          </div>
        </div>
      </div>
    </>
  );
}
