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
    let user = useContext(UserContext)
    let router = useRouter();
    const [password, set_password] = useState('');
    const [newPassword, set_new_password] = useState('');
    const [verifyPassword, set_verify_password] = useState('');
    const [error, setError] = useState(null);

    


    return (  
        <EmbloyV className="gap-4">
            <EmbloyP>
                Two-factor authentication minimizes the chances of unauthorized access. In the event of a compromised password, the 2nd auth step is a barrier against potential breaches.
                <a
                    className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                    href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn more
                </a>
                about the benefits of 2FA.
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
                <EmbloyInputboxElement className="items-center" head="SMS/Text message" description="Get one-time authentication codes sent to your phone via SMS. (Android users' choice)">
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