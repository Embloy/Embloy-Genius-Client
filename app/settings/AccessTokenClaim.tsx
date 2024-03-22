import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";
import {logout, request_access} from "@/lib/authentication";
import {getCookie} from "cookies-next";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/misc/dropdown-menu";
import {cast_date, date_seconds_from_now} from "@/lib/utils/formats";
import '@/app/globals.css'
interface Expiration {
    [key: string]: number;
}

const expirations: Expiration[] = [
    {"1 minute": 60},
    {"30 minutes": 1800},
    {"1 hour": 3600},
    {"4 hours": 14400},
    {"12 hours": 43200}
];

export function AccessTokenClaim() {
    const router = useRouter();

    const [note, setNote] = useState('');
    const [noteIsHovered, setNoteIsHovered] = useState(false);
    const handleNoteHover = () => {
        setNoteIsHovered(true);
    };
    const handleNoteNotHover = () => {
        setNoteIsHovered(false);
    };
    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const [expires, setExpires] = useState(60);
    const [expiresIsHovered, setExpiresIsHovered] = useState(false);
    const handleExpiresHover = () => {
        setExpiresIsHovered(true);
    };
    const handleExpiresNotHover = () => {
        setExpiresIsHovered(false);
    };
    const handleExpires = (e) => {
        setExpires(e);
    }


    async function fetch_access_token() {
        try {
            // todo: check parameters, if any given
            try {
                return request_access(getCookie("refresh", {path: "/"}))
                    .then((token) => {
                        return token
                    })
                    .catch((error) => {
                        logout(router);
                    });

            } catch (error) {
                logout(router);
            }

        } catch (error) {
            console.log("Fetching failed: " + error);

        }
    }


    const [isLoading, setIsLoading] = useState(false);
    const [success, setSucess] = useState(null);
    const accessTokenRef = useRef(null);
    const handleGenerate = async (e) => {
        //todo: take parameters into account
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = await fetch_access_token();
            if (token) {
                accessTokenRef.current.value = token;
                accessTokenRef.current.select();
                document.execCommand('copy'); // all browsers except firefox don't support mozillas new standard function yet...; https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand?retiredLocale=de#browser_compatibility
                setSucess(true);
            } else {
                setSucess(false);
            }


            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setSucess(false);
            setIsLoading(false);
        }

    }


    return (
<div className="text-sm w-full flex flex-col items-center justify-start border border-gray-700 rounded-lg mt-2 mb-6">
    <div className="w-full flex flex-row items-center justify-start c1 border-b border-gray-700 px-4 py-2">
        <h1 className="font-semibold">Access Token Request</h1>
    </div>
    <div className="w-full flex flex-row items-center justify-start px-4 py-2">
        <p className="c1">Access Tokens operate similarly to typical OAuth access tokens. They serve
            as substitutes for a username and password when interacting with any Embloy Backend System. The
            common use case involves using an Access Token for authentication to the API via Basic
            Authentication.</p>
    </div>
    <div className="h-4"/>
    <div className="w-full flex flex-row items-center justify-between px-4 py-2 flex-wrap">
        <div className="w-full flex flex-col items-start justify-start gap-1 mb-2">
            <p className="font-medium c1">Note</p>
            <input
                className="c0 h-7 w-full md:w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg"
                type="text"
                name="note"
                value={note}
                onChange={handleNoteChange}
                onMouseEnter={handleNoteHover}
                onMouseLeave={handleNoteNotHover}
            />
            <p className="mx-1 font-medium text-xs text-embloy-purple-light hover:text-embloy-purple-lighter">
                <a href="https://developers.embloy.com/docs/core/tokens/token_info#access-token" target="_blank" rel="noopener noreferrer">
                    What&apos;s this token for? 
                </a>
            </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-1">
            <p className="font-medium c1">Expiration*</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleExpiresHover} onMouseLeave={handleExpiresNotHover}>
                    <button
                        className={expiresIsHovered ? "bg3 c0 h-7 w-full md:w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "c0 h-7 w-full md:w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                        <p>{expires} sec.</p>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {
                        expirations.map((expiration, index) => {
                            const key = Object.keys(expiration)[0];
                            const value = Object.values(expiration)[0];
                            return (
                                <DropdownMenuCheckboxItem
                                    key={index}
                                    className="capitalize dark:hover:text-embloy-gray hover:text-embloy-gray-dark cursor-pointer"
                                    checked={value == expires}
                                    onCheckedChange={(check) => {
                                        if (check) {
                                            handleExpires(value)
                                        }
                                    }}
                                >
                                    {key}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-xs c3">This token will expire
                on {cast_date(date_seconds_from_now(expires), "us")} {cast_date(date_seconds_from_now(expires), "time-us")}</p>
        </div>

        {isLoading ? (
            <div className="w-full flex flex-row items-center justify-end gap-6">
                <div
                    className="text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-lighter outline-none select-all rounded-full cursor-wait">
                    <p className="select-none">Loading</p>
                </div>
            </div>

        ) : (
            <div className="w-full flex flex-row items-center justify-end gap-6">
                {success != null ? (
                    success ? (
                        <div
                            className="text-embloy-purple-light h-7 px-4 border-[2px] border-transparent hover:border-transparent outline-none select-all rounded-full">
                            <p className="select-none">Copied to clipboard!</p>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-end gap-2">
                            <p className="select-none text-red-500">Something went wrong. Try again!</p>
                            <button onClick={handleGenerate}
                                    className="text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none select-all rounded-full">
                                <p className="select-none">Generate</p>
                            </button>
                        </div>

                    )

                ) : (
                    <button onClick={handleGenerate}
                            className="text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none select-all rounded-full">
                        <p className="select-none">Generate</p>
                    </button>
                )}

            </div>
        )}
    </div>
    <input
        ref={accessTokenRef}
        type="text"
        style={{position: 'absolute', left: '-9999px'}}
        readOnly
    />
</div>
    );
}
