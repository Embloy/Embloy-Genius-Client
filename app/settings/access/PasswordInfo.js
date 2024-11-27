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
export function PasswordInfo(reload) {
    let {user, company} = useContext(UserContext)
    let router = useRouter();
    const [password, set_password] = useState('');
    const [newPassword, set_new_password] = useState('');
    const [verifyPassword, set_verify_password] = useState('');
    const [error, setError] = useState(null);

    const handlePasswordChange = async () => {
        if (password !== '' && newPassword !== '' && verifyPassword !== '' && password.length >= 8 && newPassword.length >= 8 && verifyPassword.length >= 8) {
            if (password !== newPassword && newPassword === verifyPassword) {
                try {
                    setError(null);
                    await force_login(user.email, password, router);
                    const response = await not_core_get("PATCH", "/user/password", { user: { password: newPassword, password_confirmation: verifyPassword } });
                    console.log(response);
                    set_password('');
                    set_new_password('');
                    set_verify_password('');
                } catch (error) {
                    setError('error');
                    set_password('');
                    set_new_password('');
                    set_verify_password('');
                    
                }
            } 
        }
        

    }


    return (  
        <EmbloyV className="gap-4">
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Password" description="Your current password">
                    <EmbloyInput
                        name="Password"
                        variant="password"
                        value={password}
                        required={true}
                        onChange={(e) => set_password(e.target.value)}
                        placeholder="Password"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handlePasswordChange();
                            }
                        }}
                        onBlur={handlePasswordChange}
                    />
                </EmbloyInputboxElement>
            </EmbloyInputbox>
            <EmbloyInputbox>
                <EmbloyInputboxElement head="New Password">
                    <EmbloyInput
                        name="New Password"
                        variant="password"
                        value={newPassword}
                        required={true}
                        onChange={(e) => set_new_password(e.target.value)}
                        placeholder="New Password"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handlePasswordChange();
                            }
                        }}
                        onBlur={handlePasswordChange}
                    />
                </EmbloyInputboxElement>
            </EmbloyInputbox>
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Verify Password" description="Verify your new password">
                    <EmbloyInput
                        name="Verify Password"
                        variant="password"
                        value={verifyPassword}
                        required={true}
                        onChange={(e) => set_verify_password(e.target.value)}
                        placeholder="Verify Password"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handlePasswordChange();
                            }
                        }}
                        onBlur={handlePasswordChange}
                    />
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}