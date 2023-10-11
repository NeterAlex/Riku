export default function Footer() {
    return (
        <>
            <div className="w-full bg-[#f4f4f4] h-[50px] flex px-20 justify-center items-center gap-5">
                <div className="w-[70%] flex justify-around">
                    <div className="flex-2">
                        <p className="text-gray-400 text-sm">NeterAlex © 2023 </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <p className="text-gray-400 text-sm">黑ICP备2023004156号-1</p>
                    </div>
                    <div className="flex-2">
                        <p className="text-gray-400 text-sm">Powered by Riku</p>
                    </div>
                </div>
            </div>
        </>
    )
}