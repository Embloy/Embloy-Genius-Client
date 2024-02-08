import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import '../globals.css'
export function NotificationSettings() {

    let user = useContext(UserContext);
    const [notificationEmails, setNotificationEmails] = useState({});
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (user && !notificationEmails[user.email]) {
            setNotificationEmails((prevEmails) => ({
                ...prevEmails,
                [user.email]: true, // todo: repace with locic that checks wheter this mail is actually in the notifications
            }));
        }
    }, [user, notificationEmails]);

    const handleNotificationEmails = (email, isChecked) => {
        setNotificationEmails((prevEmails) => ({
            ...prevEmails,
            [email]: isChecked,
        }));
    };

    const addNewEmail = () => {
        if (newEmail.trim() !== '') {
            setNotificationEmails((prevEmails) => ({
                ...prevEmails,
                [newEmail.trim()]: false,
            }));
            setNewEmail('');
        }
    };


    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium c2">Verified Emails</h1>
                <div className="border border-gray-700 px-2 rounded-full">
                    <p className="c3 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="c2">
                    Add extra email addresses to your account and specify where you´d like notifications to be sent. You´re able to select multiple email addresses.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="outline-none"

                        disabled={true}
                    >
                        <button
                            className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-none rounded-lg text-left flex flex-row cursor-not-allowed" >
                            <p className="c3">
                                {Object.keys(notificationEmails).length > 0
                                    ? Object.keys(notificationEmails).find(
                                    (email) => notificationEmails[email]
                                ) || 'None selected'
                                    : 'None selected'}
                            </p>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {Object.keys(notificationEmails).map((email, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                className="c2 hover:c0 cursor-pointer"
                                checked={notificationEmails[email]}
                                onCheckedChange={(check) =>
                                    handleNotificationEmails(email, check)
                                }
                            >
                                {email}
                            </DropdownMenuCheckboxItem>
                        ))}
                        <div className="flex items-center justify-between mt-2">
                            <input
                                type="text"
                                placeholder="Enter new email"
                                value={newEmail}
                                className="border border-gray-700 px-2 py-1 rounded-lg c2 focus:outline-none"
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <button
                                className="c0 h-7 px-2 border-[2px] border-gray-700 rounded-lg text-sm focus:outline-none"
                                onClick={addNewEmail}
                            >
                                Add
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}