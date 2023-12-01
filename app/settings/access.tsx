"use client"

export function AccessSettings() {
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-between ">
                <div className="text-sm text-gray-400 w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="font-normal text-2xl flex flex-row items-center justify-start gap-4 ">
                        <h1>Tokens</h1>
                    </div>
                    <div className="text-gray-700 flex flex-row items-center justify-start">
                        <p>Generate tokens to access the</p>
                        <div className="w-1"/>
                        <a className="italic text-gray-600 hover:underline cursor-pointer"
                           href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"><p>Embloy API</p></a>
                        <div className="w-1"/>
                        <p>.</p>
                    </div>
                </div>

                <div className="text-sm text-gray-400 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <div className="font-semibold flex flex-row items-center justify-start gap-4">
                        <h1>Refresh Token</h1>
                    </div>
                    <div className="h-1"/>
                    <div className="font-semibold flex flex-row items-center justify-start gap-4">
                        <h1>Access Token</h1>
                    </div>
                    <div className="h-1"/>
                    <div className="font-semibold flex flex-row items-center justify-start gap-4">
                        <h1>Client Token</h1>
                    </div>
                </div>
            </div>
        </div>
    )

}