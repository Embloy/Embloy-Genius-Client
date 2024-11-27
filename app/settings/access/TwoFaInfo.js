import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import '@/app/globals.css'
import {AvatarButton} from "@/app/components/ui/misc/avatar";
import { not_core_get } from "@/lib/api/core";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption } from "@/app/components/ui/misc/input";
import { patch_user, set_avatar as post_avatar, remove_avatar } from "@/lib/api/user";
import { force_login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { EmbloyP } from "@/app/components/ui/misc/text";
export function TwoFaInfo(reload) {
    let {user, company} = useContext(UserContext)
    let router = useRouter();
    const [password, set_password] = useState('');
    const [newPassword, set_new_password] = useState('');
    const [verifyPassword, set_verify_password] = useState('');
    const [error, setError] = useState(null);

    


    return (  
        <EmbloyV className="gap-4">
            <EmbloyP>
                Two-factor authentication (2FA) significantly reduces the risk of unauthorized access. If a password is compromised, the second authentication step adds a crucial layer of protection. While we don&apos;t currently offer an Android app, we plan to in the future.
                For now, using SMS for 2FA is better than not having any extra security, but authentication apps are still the preferred method.
                <a
                    className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                    href="https://www.ccc.de/en/updates/2024/2fa-sms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn more
                </a>
            </EmbloyP>
            <EmbloyInputbox>
                <EmbloyInputboxElement className="items-center" head="Embloy Mobile" description="Embloy Mobile can be used for two-factor authentication through your IOS device.">
                    <EmbloyP></EmbloyP>
                    <EmbloyH className={"justify-end"}>
                        <EmbloyToggle 
                            disabled={true}
                            className="h-7" 
                        />
                    </EmbloyH>
                </EmbloyInputboxElement>
            </EmbloyInputbox>
            <EmbloyInputbox>
                <EmbloyInputboxElement className="items-center" head="SMS/Text message" description="Get one-time authentication codes sent to your phone via SMS. (Android users&apos; choice)">
                    <EmbloyP></EmbloyP>
                    <EmbloyH className={"justify-end"}>
                        <EmbloyToggle 
                            disabled={true}
                            className="h-7" 
                        />
                    </EmbloyH>
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}