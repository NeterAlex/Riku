export default function Footer() {
  return (
    <>
      <div className="header-font flex w-full flex-col items-center justify-center gap-2 bg-[#f4f4f4] px-20 py-5 dark:bg-[#242224]">
        <div className="flex flex-1 justify-center">
          <a
            className="text-sm text-gray-400"
            href={"https://beian.miit.gov.cn/"}
          >
            黑ICP备2023004156号-1
          </a>
        </div>
        <div className="flex-1">
          <a
            className="text-sm text-gray-400"
            href="https://github.com/NeterAlex/Riku"
          >
            Powered by Riku @NeterAlex 2023
          </a>
        </div>
      </div>
    </>
  );
}
